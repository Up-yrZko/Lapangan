const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { isLoggedIn, isUser } = require('../middleware/auth');

// User: Dashboard
router.get('/dashboard', isLoggedIn, isUser, bookingController.userDashboard);

module.exports = router;
