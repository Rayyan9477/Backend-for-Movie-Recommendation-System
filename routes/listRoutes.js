// routes/listRoutes.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const List = require('../models/list');

// Create a new custom list
router.post('/', auth, async (req, res) => {
  const { name, movies, isPublic } = req.body;

  try {
    const list = new List({
      name,
      user: req.user.id,
      movies,
      isPublic,
    });

    await list.save();
    res.json(list);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Additional routes for updating, deleting, and retrieving lists

module.exports = router;