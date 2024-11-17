// routes/discussionRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Discussion = require('../models/Discussion');

// Get all discussions
router.get('/', async (req, res) => {
  try {
    const discussions = await Discussion.find()
      .sort({ createdAt: -1 })
      .populate('user', 'name')
      .populate('movie', 'title');
    res.json(discussions);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Create discussion
router.post('/', auth, async (req, res) => {
  try {
    const discussion = new Discussion({
      ...req.body,
      user: req.user.id
    });
    await discussion.save();
    res.json(discussion);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Add comment to discussion
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    discussion.comments.push({
      user: req.user.id,
      content: req.body.content
    });
    await discussion.save();
    res.json(discussion);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;