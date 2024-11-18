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

// Add a movie to a list
router.post('/:listId/movies', auth, async (req, res) => {
  const { movieId } = req.body;
  try {
    const list = await List.findById(req.params.listId);
    if (!list) return res.status(404).json({ msg: 'List not found' });
    if (list.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Unauthorized' });
    if (!list.movies.includes(movieId)) {
      list.movies.push(movieId);
      await list.save();
    }
    res.json(list);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get followers of a custom list
router.get('/:id/followers', auth, async (req, res) => {
  try {
    const list = await List.findById(req.params.id).populate('followers', 'name');
    if (!list) return res.status(404).json({ msg: 'List not found' });
    res.json(list.followers);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Follow a custom list
router.post('/:id/follow', auth, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) return res.status(404).json({ msg: 'List not found' });
    if (!list.followers.includes(req.user.id)) {
      list.followers.push(req.user.id);
      await list.save();
    }
    res.json({ msg: 'List followed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;