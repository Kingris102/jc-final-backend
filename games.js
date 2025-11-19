const express = require('express');
const router = express.Router();
const Game = require('../models/game.js');

router.get('/', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo juegos', details: err?.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    res.json(game);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo juego', details: err?.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newGame = new Game(req.body);
    const savedGame = await newGame.save();
    res.json(savedGame);
  } catch (err) {
    res.status(500).json({ error: 'Error creando juego', details: err?.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error actualizando juego', details: err?.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id);
    res.json({ message: 'Juego eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error eliminando juego', details: err?.message });
  }
});

module.exports = router;
