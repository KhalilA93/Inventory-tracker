import React, { useState } from "react";
import GameComponent from "./components/GameComponent/GameComponent";
import StorageSystem from "./components/StorageSystem/StorageSystem";
import ItemComponent from "./components/ItemComponent/ItemComponent";
function App() {
    const [selectedGame, setSelectedGame] = useState("");
    const [selectedStorage, setSelectedStorage] = useState("");

    return (
        <div className="App">
            <h1>Inventory Tracker</h1>
            {/* Game Component */}
            <GameComponent onGameSelect={setSelectedGame} />

            {/* Storage System Component */}
            {selectedGame && (
                <StorageSystem
                    selectedGame={selectedGame}
                    onStorageSelect={setSelectedStorage}
                />
            )}

            {/* Item Component */}
            {selectedGame && selectedStorage && (
                <ItemComponent
                    selectedGame={selectedGame}
                    selectedStorage={selectedStorage}
                />
            )}
        </div>
    );
}

export default App;
