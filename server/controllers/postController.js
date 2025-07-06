// postController.js - Handles post-related logic
const Post = require('../models/Post');
const Category = require('../models/Category');
const path = require('path');

const getImageUrl = (req, filePath) => {
  if (!filePath) return undefined;
  return req.protocol + '://' + req.get('host') + '/uploads/' + path.basename(filePath);
};

exports.getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.q || "";
    const category = req.query.category;

    // Build query
    let query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }
    if (category) {
      query.category = category;
    }

    const total = await Post.countDocuments(query);
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'username email')
      .populate('category', 'name');
    // Add full image URL
    const postsWithImage = posts.map(post => ({
      ...post.toObject(),
      featuredImage: getImageUrl(req, post.featuredImage)
    }));
    res.json({
      posts: postsWithImage,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to fetch posts' });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username email')
      .populate('category', 'name');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json({
      ...post.toObject(),
      featuredImage: getImageUrl(req, post.featuredImage)
    });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to fetch post' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const postData = req.body;
    console.log('Received post data:', postData);
    
    if (req.file) {
      postData.featuredImage = req.file.filename;
    } else {
      // Set default image if no file uploaded
      postData.featuredImage = 'default-post.jpg';
    }
    // Set author to the authenticated user
    postData.author = req.user.id;
    
    // Ensure category is properly set as ObjectId
    if (postData.category) {
      const mongoose = require('mongoose');
      try {
        postData.category = new mongoose.Types.ObjectId(postData.category);
      } catch (err) {
        return res.status(400).json({ error: 'Invalid category ID format' });
      }
    }
    
    console.log('Post data before creating:', postData);
    
    const post = new Post(postData);
    console.log('Post object before save:', post);
    console.log('Post title:', post.title);
    console.log('Post slug before save:', post.slug);
    
    await post.save();
    console.log('Post saved successfully:', post);
    console.log('Post slug after save:', post.slug);
    
    res.status(201).json({
      ...post.toObject(),
      featuredImage: getImageUrl(req, post.featuredImage)
    });
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(400).json({ error: err.message || 'Failed to create post' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const updateData = req.body;
    if (req.file) {
      updateData.featuredImage = req.file.filename;
    }
    
    // Ensure category is properly set as ObjectId if provided
    if (updateData.category) {
      const mongoose = require('mongoose');
      try {
        updateData.category = new mongoose.Types.ObjectId(updateData.category);
      } catch (err) {
        return res.status(400).json({ error: 'Invalid category ID format' });
      }
    }
    
    const post = await Post.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json({
      ...post.toObject(),
      featuredImage: getImageUrl(req, post.featuredImage)
    });
  } catch (err) {
    res.status(400).json({ error: err.message || 'Failed to update post' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to delete post' });
  }
};

exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    const { user, content } = req.body;
    if (!user || !content) return res.status(400).json({ error: 'User and content are required' });
    post.comments.push({ user, content });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Failed to add comment' });
  }
}; 