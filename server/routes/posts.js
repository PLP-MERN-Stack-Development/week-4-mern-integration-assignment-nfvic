const express = require('express');
const router = express.Router();
const { validatePost, handleValidation } = require('../middleware/validation');
const postController = require('../controllers/postController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Get all posts
router.get('/', postController.getAllPosts);
// Get a specific post
router.get('/:id', postController.getPostById);
// Create a new post (protected, with image upload)
router.post('/', auth, upload.single('featuredImage'), validatePost, handleValidation, postController.createPost);
// Update an existing post (protected, with image upload)
router.put('/:id', auth, upload.single('featuredImage'), validatePost, handleValidation, postController.updatePost);
// Delete a post (protected)
router.delete('/:id', auth, postController.deletePost);
// Add a comment to a post (protected)
router.post('/:id/comments', auth, postController.addComment);

module.exports = router; 