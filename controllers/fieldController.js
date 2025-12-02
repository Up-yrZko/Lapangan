const Field = require('../models/Field');

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
    const { name, description, price, location } = req.body;

    // Validasi
    if (!name || !price) {
      return res.status(400).json({ error: 'Nama dan harga harus diisi' });
    }

    if (isNaN(price) || price < 0) {
      return res.status(400).json({ error: 'Harga harus angka positif' });
    }

    await Field.create({
      name,
      description: description || null,
      price: parseInt(price),
      location: location || null,
      status: 'available'
    });

    res.redirect('/admin/fields');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
};

// Admin: Update field
exports.update = async (req, res) => {
  try {
    const { name, description, price, location, status } = req.body;

    // Validasi
    if (!name || !price) {
      return res.status(400).json({ error: 'Nama dan harga harus diisi' });
    }

    if (isNaN(price) || price < 0) {
      return res.status(400).json({ error: 'Harga harus angka positif' });
    }

    const field = await Field.findByPk(req.params.id);
    if (!field) {
      return res.status(404).json({ error: 'Lapangan tidak ditemukan' });
    }

    await field.update({
      name,
      description: description || null,
      price: parseInt(price),
      location: location || null,
      status: status || 'available'
    });

    res.redirect('/admin/fields');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
};

// Admin: Delete field
exports.delete = async (req, res) => {
  try {
    const field = await Field.findByPk(req.params.id);
    if (!field) {
      return res.status(404).json({ error: 'Lapangan tidak ditemukan' });
    }
    await field.destroy();
    res.redirect('/admin/fields');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
};
