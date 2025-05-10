import React, { useState } from "react";

const StorageSystem = ({ selectedGame, onStorageSelect }) => {
    const [storageSystems, setStorageSystems] = useState([]); // Removed defaults
    const [selectedStorage, setSelectedStorage] = useState("");
    const [newStorage, setNewStorage] = useState("");

    // Handle selecting a storage system
    const handleSelectStorage = (event) => {
        const storage = event.target.value;
        setSelectedStorage(storage);
        onStorageSelect(storage); // Notify parent
    };

    // Handle adding a new storage system
    const handleAddStorage = () => {
        const trimmedStorage = newStorage.trim(); // Trim whitespace from the new storage
        if (trimmedStorage && !storageSystems.includes(trimmedStorage)) {
            setStorageSystems([...storageSystems, trimmedStorage]);
            setNewStorage("");
        }
    };

    // Handle deleting a storage system
    const handleDeleteStorage = (storageName) => {
        setStorageSystems(storageSystems.filter((system) => system !== storageName));
        if (selectedStorage === storageName) {
            setSelectedStorage(""); // Clear selected storage if it was deleted
            onStorageSelect(""); // Notify parent
        }
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

                    {/* Input to add a new storage system */}
                    <div>
                        <input
                            type="text"
                            placeholder="Add a new storage system"
                            value={newStorage}
                            onChange={(e) => setNewStorage(e.target.value)}
                        />
                        <button onClick={handleAddStorage}>Add Storage System</button>
                    </div>

                    {/* List of storage systems with delete buttons */}
                    <h3 id="storage-systems-label">Available Storage Systems</h3>
                    <ul aria-labelledby="storage-systems-label">
                        {storageSystems.map((system, index) => (
                            <li key={index}>
                                {system}{" "}
                                <button onClick={() => handleDeleteStorage(system)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Please select a game first.</p>
            )}
        </div>
    );
};

export default StorageSystem;