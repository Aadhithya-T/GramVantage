const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

// User Registration
router.post('/signup', async (req, res) => {
  try {
    const { userType, mobile, code, password, aadhar, name, email } = req.body;

    // Validate required fields based on userType
    if (!userType || !['citizen', 'official', 'ngo'].includes(userType)) {
      return res.status(400).json({ message: 'Invalid user type' });
    }

    // For citizens, ensure code is not provided
    if (userType === 'citizen' && code) {
      return res.status(400).json({ message: 'Code field is not required for citizens' });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    if (!name || name.length < 2) {
      return res.status(400).json({ message: 'Name must be at least 2 characters long' });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate citizen-specific fields
    if (userType === 'citizen') {
      if (!mobile || !/^\d{10}$/.test(mobile)) {
        return res.status(400).json({ message: 'Mobile number must be 10 digits' });
      }
      if (!aadhar || !/^\d{12}$/.test(aadhar)) {
        return res.status(400).json({ message: 'Aadhar number must be 12 digits' });
      }
    }

    // Validate official/NGO-specific fields
    if (userType === 'official' || userType === 'ngo') {
      if (!code || !/^\d{5}$/.test(code)) {
        return res.status(400).json({ message: 'Organization code must be 5 digits' });
      }
    }

    // Create new user with conditional fields
    const userData = {
      userType,
      name,
      email,
      password
    };

    // Add user type specific fields
    if (userType === 'citizen') {
      userData.mobile = mobile;
      userData.aadhar = aadhar;
    } else {
      userData.code = code;
    }

    const user = new User(userData);

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({ user, token });
  } catch (error) {
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ 
        message: `${field === 'email' ? 'Email' : 'Organization code'} is already registered. Please use a different ${field}.`
      });
    }
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(400).json({ message: error.message });
  }
});

// User Login
router.post('/login/:userType', async (req, res) => {
  try {
    const { userType } = req.params;
    const { mobile, code, password } = req.body;

    // Find user based on userType and credentials
    const query = {
      userType,
      ...(userType === 'citizen' ? { mobile } : { code })
    };

    const user = await User.findOne(query);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get current user profile
router.get('/profile', auth, async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Logout
router.post('/logout', auth, async (req, res) => {
  try {
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;