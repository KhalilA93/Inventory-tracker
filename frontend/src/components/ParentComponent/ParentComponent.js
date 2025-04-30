import React, { useState } from "react";
import GameComponent from "../GameComponent/GameComponent";
import StorageSystem from "../StorageSystem/StorageSystem";
import ItemComponent from "../ItemComponent/ItemComponent";

const ParentComponent = () => {
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");

  return (
    <div>
      <GameComponent onGameSelect={setSelectedGame} />
      <StorageSystem
        selectedGame={selectedGame}
        onStorageSelect={setSelectedStorage}
      />
      <ItemComponent
        selectedGame={selectedGame}
        selectedStorage={selectedStorage}
      />
    </div>
  );
};

export default ParentComponent;
