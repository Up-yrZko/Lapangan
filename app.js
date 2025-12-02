require('dotenv').config();
const express = require('express');
const session = require('express-session');
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

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret123',
    resave: false,
    saveUninitialized: true
  })
);

// Middleware untuk pass user ke semua view
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
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
sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced successfully');
}).catch(err => {
  console.error('Database sync error:', err);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
