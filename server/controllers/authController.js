// authController.js - Handles user registration and login
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_EXPIRES_IN = '7d';

function generateToken(user) {
  return jwt.sign(
    { id: user._id, username: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    const user = new User({ username, email, password });
    await user.save();
    const token = generateToken(user);
    res.status(201).json({ user: { id: user._id, username, email }, token });
  } catch (err) {
    res.status(400).json({ error: err.message || 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = generateToken(user);
    res.json({ user: { id: user._id, username: user.username, email: user.email }, token });
  } catch (err) {
    res.status(400).json({ error: err.message || 'Login failed' });
  }
}; 