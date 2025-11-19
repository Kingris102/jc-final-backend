const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String },
  releaseYear: { type: Number },
  platform: { type: String },
  description: { type: String }
});

module.exports = mongoose.model('Game', GameSchema);

