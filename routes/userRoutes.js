// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');

// @route   GET api/users/profile
// @desc    Get user profile
// @access  Private
// Example in routes/userRoutes.js

router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
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


// @route   GET api/users
// @desc    Get all users
// @access  Private/Admin
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/users/:id
// @desc    Get user by ID
// @access  Private/Admin 
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;

