const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { isLoggedIn, isUser } = require('../middleware/auth');

// User: Show booking form
router.get('/:field_id', isLoggedIn, isUser, bookingController.form);

// User: Create booking
router.post('/:field_id', isLoggedIn, isUser, bookingController.create);

// User: Edit booking form
router.get('/edit/:id', isLoggedIn, isUser, bookingController.editForm);

// User: Update booking
router.post('/edit/:id', isLoggedIn, isUser, bookingController.update);

module.exports = router;
