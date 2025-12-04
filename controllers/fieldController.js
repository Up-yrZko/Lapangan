const Field = require('../models/Field');
const path = require('path');
const fs = require('fs');

// Get all fields untuk user
exports.list = async (req, res) => {
  try {
    const fields = await Field.findAll();
    res.render('fields', { fields, user: req.session.user, title: 'Daftar Lapangan' });
  } catch (error) {
    console.error(error);
    res.status(500).render('fields', { fields: [], error: 'Terjadi kesalahan', user: req.session.user, title: 'Daftar Lapangan' });
  }
};

// Admin: Show field management
exports.showAdmin = async (req, res) => {
  try {
    const fields = await Field.findAll();
    res.render('admin/fields', { fields, user: req.session.user, title: 'Kelola Lapangan' });
  } catch (error) {
    console.error(error);
    res.status(500).render('admin/fields', { fields: [], error: 'Terjadi kesalahan', user: req.session.user, title: 'Kelola Lapangan' });
  }
};

// Admin: Create field
exports.create = async (req, res) => {
  try {
    console.log('--- create field request body ---', req.body);
    console.log('--- create field file ---', req.file);
    const { name, description, price, location } = req.body;

    // Validasi
    if (!name || !price) {
      console.warn('⚠️ Validasi gagal: nama atau harga kosong');
      return res.status(400).render('admin/fields', { 
        error: 'Nama dan harga harus diisi', 
        fields: await Field.findAll(),
        user: req.session.user,
        title: 'Kelola Lapangan'
      });
    }

    if (isNaN(price) || price < 0) {
      console.warn('⚠️ Validasi gagal: harga tidak valid');
      return res.status(400).render('admin/fields', { 
        error: 'Harga harus angka positif', 
        fields: await Field.findAll(),
        user: req.session.user,
        title: 'Kelola Lapangan'
      });
    }

    // Handle photo
    let photoPath = null;
    if (req.file) {
      photoPath = '/uploads/' + req.file.filename;
      console.log('📸 Foto upload:', photoPath);
    }

    await Field.create({
      name,
      description: description || null,
      price: parseInt(price),
      location: location || null,
      status: 'available',
      photo: photoPath
    });

    console.log('✅ Lapangan dibuat:', name);
    req.session.message = 'Lapangan berhasil ditambahkan.';
    res.redirect('/admin/fields');
  } catch (error) {
    console.error('❌ Error create field:', error.message, error);
    const fields = await Field.findAll();
    return res.status(500).render('admin/fields', { 
      error: 'Gagal membuat lapangan: ' + error.message, 
      fields,
      user: req.session.user,
      title: 'Kelola Lapangan'
    });
  }
};

// Admin: Update field
exports.update = async (req, res) => {
  try {
    const { name, description, price, location, status } = req.body;

    // Validasi
    if (!name || !price) {
      console.warn('⚠️ Update validasi gagal: nama atau harga kosong');
      const fields = await Field.findAll();
      return res.status(400).render('admin/fields', { 
        error: 'Nama dan harga harus diisi', 
        fields,
        user: req.session.user,
        title: 'Kelola Lapangan'
      });
    }

    if (isNaN(price) || price < 0) {
      console.warn('⚠️ Update validasi gagal: harga tidak valid');
      const fields = await Field.findAll();
      return res.status(400).render('admin/fields', { 
        error: 'Harga harus angka positif', 
        fields,
        user: req.session.user,
        title: 'Kelola Lapangan'
      });
    }

    const field = await Field.findByPk(req.params.id);
    if (!field) {
      console.warn('⚠️ Lapangan tidak ditemukan:', req.params.id);
      const fields = await Field.findAll();
      return res.status(404).render('admin/fields', { 
        error: 'Lapangan tidak ditemukan', 
        fields,
        user: req.session.user,
        title: 'Kelola Lapangan'
      });
    }

    // Handle photo update
    let photoPath = field.photo; // Keep existing photo by default
    if (req.file) {
      // Delete old photo if exists
      if (field.photo) {
        const oldPhotoPath = path.join(__dirname, '..', 'public', field.photo);
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
          console.log('🗑️ Old photo deleted:', field.photo);
        }
      }
      // Set new photo path
      photoPath = '/uploads/' + req.file.filename;
      console.log('📸 Foto diupdate:', photoPath);
    }

    await field.update({
      name,
      description: description || null,
      price: parseInt(price),
      location: location || null,
      status: status || 'available',
      photo: photoPath
    });

    console.log('✅ Lapangan diupdate:', name);
    req.session.message = 'Lapangan berhasil diupdate.';
    res.redirect('/admin/fields');
  } catch (error) {
    console.error('❌ Error update field:', error.message, error);
    const fields = await Field.findAll();
    return res.status(500).render('admin/fields', { 
      error: 'Gagal update lapangan: ' + error.message, 
      fields,
      user: req.session.user,
      title: 'Kelola Lapangan'
    });
  }
};

// Admin: Delete field
exports.delete = async (req, res) => {
  try {
    const field = await Field.findByPk(req.params.id);
    if (!field) {
      return res.status(404).json({ error: 'Lapangan tidak ditemukan' });
    }

    // Delete photo file if exists
    if (field.photo) {
      try {
        const photoPath = path.join(__dirname, '../public', field.photo);
        if (fs.existsSync(photoPath)) {
          fs.unlinkSync(photoPath);
          console.log('✅ Foto dihapus:', photoPath);
        }
      } catch (fileError) {
        console.warn('⚠️ Gagal hapus foto:', fileError.message);
      }
    }

    // Hard delete - booking akan dihapus otomatis via CASCADE
    await field.destroy();
    console.log('✅ Lapangan dan booking terkait dihapus:', field.name);
    req.session.message = 'Lapangan berhasil dihapus.';
    res.redirect('/admin/fields');
  } catch (error) {
    console.error('❌ Error delete field:', error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
};
