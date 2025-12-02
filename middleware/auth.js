// Middleware: cek apakah sudah login
function isLoggedIn(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }
  next();
}

// Middleware: hanya untuk user biasa
function isUser(req, res, next) {
  if (!req.session.user || req.session.user.role !== 'user') {
    return res.redirect('/auth/login');
  }
  next();
}

// Middleware: hanya untuk admin
function isAdmin(req, res, next) {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.redirect('/auth/login');
  }
  next();
}

// Middleware: auto redirect dari landing page "/" berdasarkan role
function redirectLanding(req, res, next) {
  if (!req.session.user) {
    return res.render('index', { user: null });
  }
  if (req.session.user.role === 'admin') {
    return res.redirect('/admin/dashboard');
  }
  return res.redirect('/user/dashboard');
}

module.exports = {
  isLoggedIn,
  isUser,
  isAdmin,
  redirectLanding
};
