const express = require('express');
const router = express.Router();
const fieldController = require('../controllers/fieldController');
const { isLoggedIn, isAdmin } = require('../middleware/auth');
const upload = require('../config/multer');

// User: List all fields
router.get('/', fieldController.list);

// Admin: Manage fields
router.get('/admin', isLoggedIn, isAdmin, fieldController.showAdmin);
router.post('/admin', isLoggedIn, isAdmin, upload.single('photo'), fieldController.create);
router.post('/admin/:id', isLoggedIn, isAdmin, fieldController.update);
router.get('/admin/:id/delete', isLoggedIn, isAdmin, fieldController.delete);

module.exports = router;
