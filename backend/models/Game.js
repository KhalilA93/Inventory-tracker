const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Game", gameSchema);
