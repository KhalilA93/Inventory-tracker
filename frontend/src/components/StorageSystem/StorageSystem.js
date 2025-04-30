import React, { useState } from "react";

const StorageSystem = ({ selectedGame, onStorageSelect }) => {
  const [storageSystems] = useState([
    "Bank",
    "Inventory",
    "Chest",
    "Box",
  ]); // Predefined storage systems
  const [selectedStorage, setSelectedStorage] = useState("");

  // Handle selecting a storage system
    const handleSelectStorage = (event) => {
        const storage = event.target.value;
        setSelectedStorage(storage);
        onStorageSelect(storage); // Notify the parent
  };

  return (
    <div>
      <h2>Storage System</h2>
      {selectedGame ? (
        <>
          <p>Selected Game: {selectedGame}</p>

          {/* Dropdown to select a storage system */}
          <label htmlFor="storage-select">Choose a storage system:</label>
          <select
            id="storage-select"
            value={selectedStorage}
            onChange={handleSelectStorage}
          >
            <option value="">--Select a Storage System--</option>
            {storageSystems.map((system, index) => (
              <option key={index} value={system}>
                {system}
              </option>
            ))}
          </select>
          <p>Selected Storage System: {selectedStorage || "None"}</p>
        </>
      ) : (
        <p>Please select a game first.</p>
      )}
    </div>
  );
};

export default StorageSystem;
