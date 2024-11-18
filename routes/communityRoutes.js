// routes/communityRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Discussion = require('../models/Discussion');

// Get all discussion threads
router.get('/', async (req, res) => {
  try {
    const discussions = await Discussion.find()
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json(discussions);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Post a new discussion thread
router.post('/', auth, async (req, res) => {
  const { title, content, tags } = req.body;
  try {
    const discussion = new Discussion({
      title,
      content,
      user: req.user.id,
      tags,
    });
    await discussion.save();
    res.json(discussion);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete a discussion thread
router.delete('/:id', auth, async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) return res.status(404).json({ msg: 'Discussion not found' });
    if (discussion.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Unauthorized' });
    await discussion.remove();
    res.json({ msg: 'Discussion removed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;