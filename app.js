require('dotenv').config();
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const path = require('path');
const sequelize = require('./config/database');

// Models
const User = require('./models/User');
const Field = require('./models/Field');
const Booking = require('./models/Booking');

// Routes
const authRoutes = require('./routes/auth');
const fieldRoutes = require('./routes/field');
const bookingRoutes = require('./routes/booking');
const adminRoutes = require('./routes/index');

// Middleware
const { redirectLanding } = require('./middleware/auth');

const app = express();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration with file store
const sessionStore = new FileStore({
  path: path.join(__dirname, 'sessions'),
  ttl: 24 * 60 * 60  // 24 hours
});

app.use(
  session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET || 'secret123',
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: false,  // Set to true if using HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000  // 24 hours in milliseconds
    }
  })
);

// Middleware untuk pass user ke semua view
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Simple flash messages (store in session)
app.use((req, res, next) => {
  res.locals.message = req.session.message || null;
  res.locals.error = req.session.error || null;
  delete req.session.message;
  delete req.session.error;
  next();
});

// Routes
app.get('/', redirectLanding);
app.use('/auth', authRoutes);
app.use('/fields', fieldRoutes);
app.use('/booking', bookingRoutes);
app.use('/admin', adminRoutes);
app.use('/user', require('./routes/user'));

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { title: 'Halaman Tidak Ditemukan' });
});

// Sync database
// Gunakan force: true hanya untuk development pertama kali
const syncOptions = process.env.DB_FORCE_SYNC === 'true' ? { force: true } : { alter: false };
sequelize.sync(syncOptions).then(() => {
  console.log('Database synced successfully');
}).catch(err => {
  console.error('Database sync error:', err.message);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
