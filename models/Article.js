// models/Article.js
const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: ['news', 'review', 'feature'],
    required: true
  },
  tags: [String],
  publishDate: {
    type: Date,
    default: Date.now
  },
  imageUrl: String
});

module.exports = mongoose.model('Article', ArticleSchema);