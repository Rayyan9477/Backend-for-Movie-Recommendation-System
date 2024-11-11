// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');

// @route   GET api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// @route   PUT api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
  const { name, preferences } = req.body;

  try {
    let user = await User.findById(req.user.id);

    if (name) user.name = name;
    if (preferences) user.preferences = preferences;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// @route   POST api/users/wishlist
// @desc    Add movie to wishlist
// @access  Private
router.post('/wishlist', auth, async (req, res) => {
  const { movieId } = req.body;

  try {
    let user = await User.findById(req.user.id);

    if (!user.wishlist.includes(movieId)) {
      user.wishlist.push(movieId);
    }

    await user.save();
    res.json(user.wishlist);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// @route   GET api/users/wishlist
// @desc    Get user wishlist
// @access  Private
router.get('/wishlist', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('wishlist');
    res.json(user.wishlist);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;