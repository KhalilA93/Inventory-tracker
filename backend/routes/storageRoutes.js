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

// Delete a storage system by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the storage system
    const deletedStorage = await StorageSystem.findByIdAndDelete(id);
    if (!deletedStorage) {
      return res.status(404).json({ message: "Storage system not found" });
    }

    // Cascade delete: Remove associated items
    await Item.deleteMany({ storage: id });

    res.status(200).json({ message: "Storage system and associated items deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete storage system" });
  }
});

module.exports = router;
