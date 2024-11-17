// routes/articleRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const adminAuth = require('../middleware/adminAuthMiddleware');
const Article = require('../models/Article');

// Get all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find()
      .sort({ publishDate: -1 })
      .populate('author', 'name');
    res.json(articles);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Create article (admin only)
router.post('/', [auth, adminAuth], async (req, res) => {
  try {
    const article = new Article({
      ...req.body,
      author: req.user.id
    });
    await article.save();
    res.json(article);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;