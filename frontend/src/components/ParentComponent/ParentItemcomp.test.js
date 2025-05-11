import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import ParentComponent from "./ParentComponent";

describe("ParentComponent - ItemComponent Integration", () => {
  afterEach(() => {
    // Cleanup the DOM after each test
    document.body.innerHTML = "";
  });

  it("handles interactions with the ItemComponent", () => {
    render(<ParentComponent />);

    // Add a new game
    const gameInput = screen.getByPlaceholderText("Add a new game");
    const gameAddButton = screen.getByText("Add Game");
    fireEvent.change(gameInput, { target: { value: "Test Game" } });
    fireEvent.click(gameAddButton);

    // Ensure the game is added and selected
    const gameDropdown = screen.getByLabelText("Choose a game:");
    fireEvent.change(gameDropdown, { target: { value: "Test Game" } });

    // Add a new storage system
    const storageInput = screen.getByPlaceholderText("Add a new storage system");
    const storageAddButton = screen.getByText("Add Storage System");
    fireEvent.change(storageInput, { target: { value: "Test Storage" } });
    fireEvent.click(storageAddButton);

    // Ensure the storage system is added and selected
    const storageList = screen.getByRole("list", { name: "Available Storage Systems" });
    const storageItem = within(storageList).getByText("Test Storage");
    expect(storageItem).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Choose a storage system:"), { target: { value: "Test Storage" } });

    // Add a new item
    const itemNameInput = screen.getByPlaceholderText("Item Name");
    const itemQuantityInput = screen.getByPlaceholderText("Quantity");
    const itemAddButton = screen.getByText("Add Item");
    fireEvent.change(itemNameInput, { target: { value: "Test Item" } });
    fireEvent.change(itemQuantityInput, { target: { value: 5 } });
    fireEvent.click(itemAddButton);

    // Ensure the item is added
    const itemList = screen.getByRole("list", { name: "Items" });
    const item = within(itemList).getByText("Test Item (Quantity: 5)");
    expect(item).toBeInTheDocument();
  });
});