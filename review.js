const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
  username: { type: String, required: true },
  rating: { type: Number, min: 1, max: 10, required: true }, // puntuación tipo Steam
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Review", ReviewSchema);
