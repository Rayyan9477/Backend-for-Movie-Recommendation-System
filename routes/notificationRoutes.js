// routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Notification = require('../models/Notification');
const Movie = require('../models/Movie');

// Get User Notifications
router.get('/', auth, async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.userId });
    res.json(notifications);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Mark Notification as Read
router.put('/:id/read', auth, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    notification.isRead = true;
    await notification.save();
    res.json(notification);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get notifications for upcoming movies
router.get('/upcoming', auth, async (req, res) => {
  try {
    const movies = await Movie.find({ isUpcoming: true });
    // Logic to create notifications
    res.json(movies);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get top rated movies
router.get('/top-rated', async (req, res) => {
  try {
    const movies = await Movie.find().sort({ averageRating: -1 }).limit(10);
    res.json(movies);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get trending movies
router.get('/trending', async (req, res) => {
  try {
    const movies = await Movie.find().sort({ reviewCount: -1 }).limit(10);
    res.json(movies);
  } catch (err) {
    res.status(500).send('Server error');
  }
});



module.exports = router;