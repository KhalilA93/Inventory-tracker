import React, { useState, useEffect } from "react";
import { fetchGames, addGame, deleteGame } from "../../api/apiService";

const GameComponent = ({ onGameSelect }) => {
    const [games, setGames] = useState([]); // Initial games should be an empty array
    const [selectedGame, setSelectedGame] = useState("");
    const [newGame, setNewGame] = useState("");
    const [error, setError] = useState(null);

    // Fetch games on component mount
    useEffect(() => {
        const loadGames = async () => {
            try {
                const response = await fetchGames();
                setGames(response.data);
            } catch (err) {
                setError("Failed to load games. Please try again later.");
            }
        };
        loadGames();
    }, []);

    // Handle selecting a game from the dropdown
    const handleSelectGame = (event) => {
        const selectedGame = event.target.value;
        setSelectedGame(selectedGame);
        onGameSelect(selectedGame); // Notify parent
    };

    // Handle adding a new game
    const handleAddGame = async () => {
        const trimmedGame = newGame.trim(); // Trim whitespace from the new game
        if (trimmedGame && !games.includes(trimmedGame)) {
            try {
                const response = await addGame({ name: trimmedGame });
                setGames([...games, response.data.name]);
                setNewGame("");
            } catch (err) {
                setError("Failed to add game. Please try again later.");
            }
        }
    };

    // Handle deleting a game
    const handleDeleteGame = async (gameName) => {
        try {
            await deleteGame(gameName);
            setGames(games.filter((game) => game !== gameName));
            if (selectedGame === gameName) {
                setSelectedGame(""); // Clear selected game if it was deleted
                onGameSelect(""); // Notify parent
            }
        } catch (err) {
            setError("Failed to delete game. Please try again later.");
        }
    };

    return (
        <div>
            <h2>Game Component</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Dropdown to select a game */}
            <label htmlFor="game-select">Choose a game:</label>
            <select id="game-select" value={selectedGame} onChange={handleSelectGame} aria-label="Game Dropdown">
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

            {/* List of games with delete buttons */}
            <h3>Available Games</h3>
            <ul aria-label="Available Games">
                {games.map((game, index) => (
                    <li key={index}>
                        {game}{" "}
                        <button onClick={() => handleDeleteGame(game)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GameComponent;