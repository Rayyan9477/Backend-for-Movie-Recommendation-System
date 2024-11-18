// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Movie = require('../models/Movie');
const adminAuth = require('../middleware/adminAuthMiddleware');
const Actor = require('../models/Actor');
const Director = require('../models/Director');


// Middleware to check if user is admin (for simplicity, assuming a field in user model)
// const adminAuth = (req, res, next) => {
//   if (req.user && req.user.isAdmin) {
//     next();
//   } else {
//     res.status(403).json({ msg: 'Admin authorization required' });
//   }
// };

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
    const movie = await findByIdAndUpdate(req.params.id, movieData, {
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
    await findByIdAndDelete(req.params.id);
    res.json({ msg: 'Movie deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Additional admin routes for managing users, reviews, statistics can be added here.

router.post('/actors', auth, adminAuth, async (req, res) => {
  const actorData = req.body;

  try {
    const actor = new Actor(actorData);
    await actor.save();
    res.json(actor);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Add a new director
router.post('/directors', auth, adminAuth, async (req, res) => {
  const directorData = req.body;

  try {
    const director = new Director(directorData);
    await director.save();
    res.json(director);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// routes/adminRoutes.js

router.get('/stats', auth, adminAuth, async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const movieCount = await Movie.countDocuments();
    const reviewCount = await Review.countDocuments();
    // Additional statistics as needed

    res.json({
      users: userCount,
      movies: movieCount,
      reviews: reviewCount,
      // ...
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Manage user reviews (e.g., delete inappropriate reviews)
router.delete('/reviews/:id', auth, adminAuth, async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Review deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get all movies (Admin)
router.get('/movies', [auth, adminAuth], async (req, res) => {
  try {
    const movies = await Movie.find().populate('director').populate('cast');
    res.json(movies);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/trending-genres', [auth, adminAuth], async (req, res) => {
  try {
    const genres = await Movie.aggregate([
      { $unwind: '$genre' },
      { $group: { _id: '$genre', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    res.json(genres);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;