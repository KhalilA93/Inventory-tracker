const express = require("express");
const router = express.Router();
const StorageSystem = require("../models/StorageSystem");

// Get all storage systems for a game
router.get("/:gameId", async (req, res) => {
  const storageSystems = await StorageSystem.find({ game: req.params.gameId });
  res.json(storageSystems);
});

// Add a new storage system
router.post("/", async (req, res) => {
  const { name, game } = req.body;
  const storageSystem = new StorageSystem({ name, game });
  await storageSystem.save();
  res.status(201).json(storageSystem);
});

module.exports = router;
