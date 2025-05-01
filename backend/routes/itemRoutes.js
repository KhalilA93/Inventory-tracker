const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// Get all items for a storage system
router.get("/:storageId", async (req, res) => {
  const items = await Item.find({ storage: req.params.storageId });
  res.json(items);
});

// Add a new item
router.post("/", async (req, res) => {
  const { name, quantity, storage, game } = req.body;
  const item = new Item({ name, quantity, storage, game });
  await item.save();
  res.status(201).json(item);
});

// Delete an item by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the item
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete item" });
  }
});
module.exports = router;
