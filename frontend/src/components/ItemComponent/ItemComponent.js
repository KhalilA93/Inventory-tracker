import React, { useState } from "react";

const ItemComponent = ({ selectedGame, selectedStorage }) => {
    const [items, setItems] = useState([]); // List of items
    const [itemName, setItemName] = useState("");
    const [itemQuantity, setItemQuantity] = useState(1);

    // Handle adding a new item
    const handleAddItem = () => {
        if (itemName.trim() && itemQuantity > 0) {
            setItems([
                ...items,
                { name: itemName, quantity: itemQuantity, game: selectedGame, storage: selectedStorage },
            ]);
            setItemName("");
            setItemQuantity(1);
        }
    };

    // Handle deleting an item
    const handleDeleteItem = (itemName) => {
        setItems(items.filter((item) => item.name !== itemName));
    };

    return (
        <div>
            <h2>Item Component</h2>
            {selectedGame && selectedStorage ? (
                <>
                    <p>Selected Game: {selectedGame}</p>
                    <p>Selected Storage System: {selectedStorage}</p>

                    {/* Form to add a new item */}
                    <div>
                        <input
                            type="text"
                            placeholder="Item Name"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Quantity"
                            value={itemQuantity}
                            onChange={(e) => setItemQuantity(Number(e.target.value))}
                            min="1"
                        />
                        <button onClick={handleAddItem}>Add Item</button>
                    </div>

                    {/* Display the list of items */}
                    <h3>Items</h3>
                    <ul aria-label="Items">
                        {items
                            .filter(
                                (item) =>
                                    item.game === selectedGame && item.storage === selectedStorage
                            )
                            .map((item, index) => (
                                <li key={index}>
                                    {item.name} (Quantity: {item.quantity}){" "}
                                    <button onClick={() => handleDeleteItem(item.name)}>Delete</button>
                                </li>
                            ))}
                    </ul>
                </>
            ) : (
                <p>Please select a game and a storage system first.</p>
            )}
        </div>
    );
};

export default ItemComponent;