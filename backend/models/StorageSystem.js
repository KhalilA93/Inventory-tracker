const mongoose = require("mongoose");

const storageSystemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  game: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
});

module.exports = mongoose.model("StorageSystem", storageSystemSchema);
