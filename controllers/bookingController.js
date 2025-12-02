const Booking = require('../models/Booking');
const Field = require('../models/Field');
const User = require('../models/User');
const { Op } = require('sequelize');

// User: Show booking form
exports.form = async (req, res) => {
  try {
    const { field_id: fieldId } = req.params;
    console.log('🔵 GET Booking Form - Field ID:', fieldId);
    const field = await Field.findByPk(fieldId);

    if (!field) {
      console.warn('⚠️ Lapangan tidak ditemukan:', fieldId);
      return res.status(404).render('404', { error: 'Lapangan tidak ditemukan', user: req.session.user, title: 'Error' });
    }

    console.log('✅ Rendering form untuk lapangan:', field.name);
    res.render('booking/form', { field, user: req.session.user, error: null, title: 'Form Booking' });
  } catch (error) {
    console.error(error);
    res.status(500).render('index', { error: 'Terjadi kesalahan', title: 'Error' });
  }
};

// User: Create booking
exports.create = async (req, res) => {
  try {
    const { booking_date, start_time, end_time, note } = req.body;
    const { field_id } = req.params; // Ambil dari URL params, bukan body
    const userId = req.session.user.id;

    console.log('🔵 Booking Request:', { field_id, booking_date, start_time, end_time, userId });

    // Validasi input
    if (!field_id || !booking_date || !start_time || !end_time) {
      console.warn('⚠️ Validasi gagal: field kosong');
      const field = await Field.findByPk(field_id);
      return res.render('booking/form', { 
        field, 
        user: req.session.user,
        error: 'Tanggal dan jam harus diisi',
        title: 'Form Booking'
      });
    }

    // Validasi jam
    if (start_time >= end_time) {
      console.warn('⚠️ Validasi gagal: jam mulai >= jam selesai');
      const field = await Field.findByPk(field_id);
      return res.render('booking/form', { 
        field, 
        user: req.session.user,
        error: 'Jam selesai harus lebih besar dari jam mulai',
        title: 'Form Booking'
      });
    }

    // Cek booking bentrok
    console.log('🔍 Checking conflict for:', { field_id, booking_date, start_time, end_time });
    const existingBooking = await Booking.findOne({
      where: {
        field_id: field_id,
        booking_date: booking_date,
        status: { [Op.ne]: 'Declined' },
        [Op.or]: [
          {
            [Op.and]: [
              { start_time: { [Op.lt]: end_time } },
              { end_time: { [Op.gt]: start_time } }
            ]
          }
        ]
      }
    });

    if (existingBooking) {
      console.warn('⚠️ Booking bentrok ditemukan:', existingBooking.id);
      const field = await Field.findByPk(field_id);
      return res.render('booking/form', { 
        field, 
        user: req.session.user,
        error: 'Jadwal bentrok dengan booking lain',
        title: 'Form Booking'
      });
    }

    // Buat booking
    console.log('✅ Creating new booking...');
    const newBooking = await Booking.create({
      user_id: userId,
      field_id,
      booking_date,
      start_time,
      end_time,
      note: note || null,
      status: 'Pending'
    });

    console.log('✅ Booking berhasil dibuat:', newBooking.id);
    res.redirect('/user/dashboard');
  } catch (error) {
    console.error('❌ ERROR BOOKING:', error.message);
    console.error('❌ Stack:', error.stack);
    try {
      const field = await Field.findByPk(req.body.field_id);
      res.render('booking/form', { 
        field, 
        user: req.session.user,
        error: `Terjadi kesalahan: ${error.message}`,
        title: 'Form Booking'
      });
    } catch (renderError) {
      console.error('❌ Render Error:', renderError.message);
      res.status(500).json({ error: error.message });
    }
  }
};

// User: Dashboard - show my bookings
exports.userDashboard = async (req, res) => {
  try {
    const userId = req.session.user.id;

    const bookings = await Booking.findAll({
      where: { user_id: userId },
      include: [
        { model: Field, attributes: ['id', 'name', 'location', 'price'] },
        { model: User, attributes: ['id', 'username'] }
      ],
      order: [['booking_date', 'DESC']]
    });

    res.render('user/dashboard', { bookings, user: req.session.user, title: 'Dashboard Booking Saya' });
  } catch (error) {
    console.error(error);
    res.status(500).render('user/dashboard', { bookings: [], error: 'Terjadi kesalahan', user: req.session.user, title: 'Dashboard Booking Saya' });
  }
};

// Admin: Dashboard - show all bookings
exports.adminDashboard = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: Field, attributes: ['id', 'name', 'location', 'price'] },
        { model: User, attributes: ['id', 'username', 'email'] }
      ],
      order: [['booking_date', 'DESC']]
    });

    res.render('admin/dashboard', { bookings, user: req.session.user, title: 'Dashboard Admin' });
  } catch (error) {
    console.error(error);
    res.status(500).render('admin/dashboard', { bookings: [], error: 'Terjadi kesalahan', user: req.session.user, title: 'Dashboard Admin' });
  }
};

// Admin: Approve booking
exports.approve = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).redirect('/admin/dashboard');
    }

    // Cek konflik dengan booking lain yang sudah approved
    const conflict = await Booking.findOne({
      where: {
        field_id: booking.field_id,
        booking_date: booking.booking_date,
        status: 'Approved',
        id: { [Op.ne]: bookingId },
        [Op.or]: [
          {
            [Op.and]: [
              { start_time: { [Op.lt]: booking.end_time } },
              { end_time: { [Op.gt]: booking.start_time } }
            ]
          }
        ]
      }
    });

    if (conflict) {
      return res.status(400).redirect('/admin/dashboard');
    }

    await booking.update({ status: 'Approved' });
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error(error);
    res.redirect('/admin/dashboard');
  }
};

// Admin: Decline booking
exports.decline = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).redirect('/admin/dashboard');
    }

    await booking.update({ status: 'Declined' });
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error(error);
    res.redirect('/admin/dashboard');
  }
};
