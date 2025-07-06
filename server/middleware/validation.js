const { body, validationResult } = require('express-validator');

// Post validation rules
exports.validatePost = [
  body('title').notEmpty().withMessage('Title is required').isLength({ max: 100 }).withMessage('Title max 100 chars'),
  body('content').notEmpty().withMessage('Content is required'),
  body('category').notEmpty().withMessage('Category is required'),
  // Add more rules as needed
];

// Category validation rules
exports.validateCategory = [
  body('name').notEmpty().withMessage('Category name is required').isLength({ max: 50 }).withMessage('Name max 50 chars'),
];

// Middleware to handle validation errors
exports.handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}; 