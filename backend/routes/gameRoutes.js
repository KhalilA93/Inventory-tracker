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


// Delete a game by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the game
    const deletedGame = await Game.findByIdAndDelete(id);
    if (!deletedGame) {
      return res.status(404).json({ message: "Game not found" });
    }

    // Cascade delete: Remove associated storage systems and items
    await StorageSystem.deleteMany({ game: id });
    await Item.deleteMany({ game: id });

    res.status(200).json({ message: "Game and associated data deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete game" });
  }
});
module.exports = router;