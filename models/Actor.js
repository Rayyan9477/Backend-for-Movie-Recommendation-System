// models/Actor.js

const mongoose = require('mongoose');

const ActorSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Actor', ActorSchema);