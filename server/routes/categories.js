const express = require('express');
const router = express.Router();
const { validateCategory, handleValidation } = require('../middleware/validation');
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');

// Get all categories
router.get('/', categoryController.getAllCategories);
// Create a new category (protected)
router.post('/', auth, validateCategory, handleValidation, categoryController.createCategory);

module.exports = router; 