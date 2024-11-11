// routes/movieRoutes.js

const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const auth = require('../middleware/authMiddleware');

// @route   GET api/movies
// @desc    Get all movies with pagination and filters
// @access  Public
router.get('/', async (req, res) => {
  const { page = 1, limit = 10, genre, director, actor, search } = req.query;

  const query = {};

  if (genre) query.genre = genre;
  if (director) query.director = director;
  if (actor) query.cast = actor;
  if (search) query.title = { $regex: search, $options: 'i' };

  try {
    const movies = await Movie.find(query)
      .populate('director')
      .populate('cast')
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Movie.countDocuments(query);

    res.json({
      movies,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// @route   GET api/movies/:id
// @desc    Get movie details
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
      .populate('director')
      .populate('cast');

    if (!movie) {
      return res.status(404).json({ msg: 'Movie not found' });
    }

    res.json(movie);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Additional routes for advanced search, filtering, and recommendations can be added here.

module.exports = router;