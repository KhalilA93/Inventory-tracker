const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  storage: { type: mongoose.Schema.Types.ObjectId, ref: "StorageSystem", required: true },
  game: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
});

module.exports = mongoose.model("Item", itemSchema);
