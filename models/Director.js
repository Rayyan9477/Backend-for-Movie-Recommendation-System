// models/Director.js

const mongoose = require('mongoose');

const DirectorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  biography: String,
  filmography: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
    },
  ],
  awards: [String],
  photos: [String],
});

module.exports = mongoose.model('Director', DirectorSchema);