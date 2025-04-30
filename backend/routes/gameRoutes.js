const express = require("express");
const router = express.Router();
const Game = require("../models/Game");

// Get all games
router.get("/", async (req, res) => {
  const games = await Game.find();
  res.json(games);
});

// Add a new game
router.post("/", async (req, res) => {
  const { name } = req.body;
  const game = new Game({ name });
  await game.save();
  res.status(201).json(game);
});

module.exports = router;
