// routes/reviewRoutes.js

const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Movie = require('../models/Movie');
const auth = require('../middleware/authMiddleware');

// @route   POST api/reviews
// @desc    Add or update a review
// @access  Private
router.post('/', auth, async (req, res) => {
  const { movieId, rating, reviewText } = req.body;

  try {
    let review = await Review.findOne({ user: req.user.id, movie: movieId });

    if (review) {
      // Update review
      review.rating = rating;
      review.reviewText = reviewText;
      await review.save();
    } else {
      // Create review
      review = new Review({
        user: req.user.id,
        movie: movieId,
        rating,
        reviewText,
      });
      await review.save();
    }

    // Update average rating
    const reviews = await Review.find({ movie: movieId });
    const averageRating =
      reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;

    await Movie.findByIdAndUpdate(movieId, { averageRating });

    res.json(review);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// @route   GET api/reviews/:movieId
// @desc    Get reviews for a movie with pagination
// @access  Public
router.get('/:movieId', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const reviews = await Review.find({ movie: req.params.movieId })
      .populate('user', 'name')
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Review.countDocuments({ movie: req.params.movieId });

    res.json({
      reviews,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;