// routes/movieRoutes.js

const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const auth = require('../middleware/authMiddleware');

// @route   GET api/movies
// @desc    Get all movies with pagination and filters
// @access  Public
router.get('/', async (req, res) => {
  const { page = 1, limit = 10, genre, director, actor, search
    , rating, year, runtime, language, country, releaseYear,
   } = req.query;

  const query = {};
  if (rating) query.rating = { $gte: rating };
  if (search) query.title = { $regex: search, $options: 'i' };
  if (genre) query.genre = { $in: genre.split(',') };
  if (director) query.director = director;
  if (actor) query.cast = { $in: actor.split(',') };
  if (search) query.title = { $regex: search, $options: 'i' };
  if (releaseYear) query.releaseYear = releaseYear;
  if (keywords) query.keywords = { $in: keywords.split(',') };


  try {
    const movies = await find(query)
      .populate('director')
      .populate('cast')
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await countDocuments(query);

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
    const movie = await findById(req.params.id)
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

router.get('/:id/boxoffice', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).select('boxOffice');
    if (!movie) return res.status(404).json({ msg: 'Movie not found' });
    res.json(movie.boxOffice);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get top movies of the month
router.get('/top/month', async (req, res) => {
  try {
    const currentMonth = new Date().getMonth();
    const movies = await Movie.find({
      releaseDate: {
        $gte: new Date(new Date().setMonth(currentMonth, 1)),
        $lt: new Date(new Date().setMonth(currentMonth + 1, 0)),
      },
    })
      .sort({ averageRating: -1 })
      .limit(10);
    res.json(movies);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get top movies by genre
router.get('/top/genre/:genre', async (req, res) => {
  try {
    const movies = await Movie.find({ genre: req.params.genre })
      .sort({ averageRating: -1 })
      .limit(10);
    res.json(movies);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;