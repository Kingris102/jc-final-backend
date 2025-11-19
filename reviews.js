const express = require("express");
const router = express.Router();
const Review = require("../models/review.js");

router.get("/:gameId", async (req, res) => {
  try {
    const reviews = await Review.find({ gameId: req.params.gameId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo reseñas', details: err?.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newReview = new Review(req.body);
    const saved = await newReview.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Error creando reseña', details: err?.message });
  }
});

module.exports = router;
