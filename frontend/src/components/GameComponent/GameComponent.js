import React, { useState } from "react";

const GameComponent = () => {
  const [games, setGames] = useState(["MineCraft", "RuneScape 3L", "Ark"]); // Initial games
  const [selectedGame, setSelectedGame] = useState("");
  const [newGame, setNewGame] = useState("");

  // Handle selecting a game from the dropdown
  const handleSelectGame = (event) => {
    setSelectedGame(event.target.value);
  };

  // Handle adding a new game
  const handleAddGame = () => {
    if (newGame.trim() && !games.includes(newGame)) {
      setGames([...games, newGame]);
      setNewGame("");
    }
  };

  return (
    <div>
      <h2>Game Component</h2>

      {/* Dropdown to select a game */}
      <label htmlFor="game-select">Choose a game:</label>
      <select id="game-select" value={selectedGame} onChange={handleSelectGame}>
        <option value="">--Select a Game--</option>
        {games.map((game, index) => (
          <option key={index} value={game}>
            {game}
          </option>
        ))}
      </select>
      <p>Selected Game: {selectedGame || "None"}</p>

      {/* Input to add a new game */}
      <div>
        <input
          type="text"
          placeholder="Add a new game"
          value={newGame}
          onChange={(e) => setNewGame(e.target.value)}
        />
        <button onClick={handleAddGame}>Add Game</button>
      </div>
    </div>
  );
};

export default GameComponent;
