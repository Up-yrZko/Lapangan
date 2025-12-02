const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Show register form
exports.showRegister = (req, res) => {
  res.render('auth/register', { error: null, success: null, title: 'Register' });
};

// Show login form
exports.showLogin = (req, res) => {
  res.render('auth/login', { error: null, title: 'Login' });
};

// Register POST
exports.register = async (req, res) => {
  try {
    const { username, email, password, password_confirm } = req.body;

    // Validasi input
    if (!username || !email || !password || !password_confirm) {
      return res.render('auth/register', { error: 'Semua field harus diisi', success: null, title: 'Register' });
    }

    if (password !== password_confirm) {
      return res.render('auth/register', { error: 'Password tidak cocok', success: null, title: 'Register' });
    }

    if (password.length < 6) {
      return res.render('auth/register', { error: 'Password minimal 6 karakter', success: null, title: 'Register' });
    }

    // Cek user sudah ada
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.render('auth/register', { error: 'Username sudah digunakan', success: null, title: 'Register' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    await User.create({
      username,
      email,
      password: hashedPassword,
      role: 'user'
    });

    return res.render('auth/register', { 
      error: null, 
      success: 'Registrasi berhasil! Silakan login.',
      title: 'Register'
    });
  } catch (error) {
    console.error(error);
    res.render('auth/register', { error: 'Terjadi kesalahan server', success: null, title: 'Register' });
  }
};

// Login POST
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('🔵 Login attempt:', { username, passwordLength: password ? password.length : 0 });

    // Validasi input
    if (!username || !password) {
      console.warn('⚠️ Validasi gagal: field kosong');
      return res.render('auth/login', { error: 'Username dan password harus diisi', title: 'Login' });
    }

    // Cari user
    const user = await User.findOne({ where: { username } });
    if (!user) {
      console.warn('⚠️ User tidak ditemukan:', username);
      return res.render('auth/login', { error: 'Username atau password salah', title: 'Login' });
    }

    console.log('✅ User ditemukan:', { id: user.id, username: user.username, role: user.role });
    console.log('🔍 Hash dari DB:', user.password);
    console.log('🔍 Password input:', password);

    // Cek password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('🔐 Password valid?', isPasswordValid);
    
    if (!isPasswordValid) {
      console.warn('⚠️ Password salah untuk user:', username);
      return res.render('auth/login', { error: 'Username atau password salah', title: 'Login' });
    }

    // Set session
    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role
    };

    // Redirect sesuai role
    if (user.role === 'admin') {
      res.redirect('/admin/dashboard');
    } else {
      res.redirect('/user/dashboard');
    }
  } catch (error) {
    console.error(error);
    res.render('auth/login', { error: 'Terjadi kesalahan server', title: 'Login' });
  }
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/');
    }
    res.redirect('/');
  });
};
