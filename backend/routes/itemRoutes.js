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

module.exports = router;
