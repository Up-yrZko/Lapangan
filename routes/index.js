const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const fieldController = require('../controllers/fieldController');
const { isLoggedIn, isAdmin } = require('../middleware/auth');
const upload = require('../config/multer');

// Admin: Dashboard
router.get('/dashboard', isLoggedIn, isAdmin, bookingController.adminDashboard);

// Admin: Booking approve/decline
router.get('/booking/:id/approve', isLoggedIn, isAdmin, bookingController.approve);
router.get('/booking/:id/decline', isLoggedIn, isAdmin, bookingController.decline);

// Admin: Field management
router.get('/fields', isLoggedIn, isAdmin, fieldController.showAdmin);
router.post('/fields', isLoggedIn, isAdmin, upload.single('photo'), fieldController.create);
router.post('/fields/:id', isLoggedIn, isAdmin, upload.single('photo'), fieldController.update);
router.get('/fields/:id/delete', isLoggedIn, isAdmin, fieldController.delete);

module.exports = router;

