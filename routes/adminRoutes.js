// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Movie = require('../models/Movie');

// Middleware to check if user is admin (for simplicity, assuming a field in user model)
const adminAuth = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ msg: 'Admin authorization required' });
  }
};

// @route   POST api/admin/movies
// @desc    Add a new movie
// @access  Private/Admin
router.post('/movies', auth, adminAuth, async (req, res) => {
  const movieData = req.body;

  try {
    const movie = new Movie(movieData);
    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// @route   PUT api/admin/movies/:id
// @desc    Update a movie
// @access  Private/Admin
router.put('/movies/:id', auth, adminAuth, async (req, res) => {
  const movieData = req.body;

  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, movieData, {
      new: true,
    });
    res.json(movie);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/admin/movies/:id
// @desc    Delete a movie
// @access  Private/Admin
router.delete('/movies/:id', auth, adminAuth, async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Movie deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Additional admin routes for managing users, reviews, statistics can be added here.

module.exports = router;