// models/Movie.js

const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: [String],
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Director',
  },
  cast: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Actor',
    },
  ],
  releaseDate: Date,
  runtime: Number,
  synopsis: String,
  averageRating: {
    type: Number,
    default: 0,
  },
  coverPhoto: String,
  trivia: [String],
  goofs: [String],
  soundtrack: [String],
  ageRating: String,
  parentalGuide: String,
  boxOffice: {
    openingWeekend: Number,
    totalEarnings: Number,
    internationalRevenue: Number,
  },
  awards: [String],
});

module.exports = mongoose.model('Movie', MovieSchema);