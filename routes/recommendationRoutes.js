// routes/recommendationRoutes.js

const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');


const { findById } = require('../models/User');
const { find } = require('../models/Movie');

// Get personalized recommendations
router.get('/', auth, async (req, res) => {
  try {
    const user = await findById(req.user.id);
    const { genres, actors } = user.preferences;

    // Recommendation logic
    const recommendations = await find({
      $or: [
        { genre: { $in: genres } },
        { 'cast.name': { $in: actors } },
      ],
    }).limit(10);

    res.json(recommendations);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;