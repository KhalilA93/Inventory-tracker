import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import ParentComponent from "./ParentComponent";

describe("ParentComponent", () => {
  it("renders child components correctly", () => {
    render(<ParentComponent />);

    expect(screen.getByText("Game Component")).toBeInTheDocument();
    expect(screen.getByText("Storage System")).toBeInTheDocument();
    expect(screen.getByText("Item Component")).toBeInTheDocument();
  });

  it("handles interactions between child components", () => {
    render(<ParentComponent />);

    // Add a new game
    const gameInput = screen.getByPlaceholderText("Add a new game");
    const gameAddButton = screen.getByText("Add Game");
    fireEvent.change(gameInput, { target: { value: "Test Game" } });
    fireEvent.click(gameAddButton);

    // Ensure the game is added and selected
    const gameDropdown = screen.getByLabelText("Choose a game:");
    const gameOption = within(gameDropdown).getByText("Test Game");
    expect(gameOption).toBeInTheDocument();

    // Add a new storage system
    const storageInput = screen.getByPlaceholderText("Add a new storage system");
    const storageAddButton = screen.getByText("Add Storage System");
    fireEvent.change(storageInput, { target: { value: "Test Storage" } });
    fireEvent.click(storageAddButton);

    // Ensure the storage system is added
    const storageList = screen.getByRole("list");
    const storageItem = within(storageList).getByText("Test Storage");
    expect(storageItem).toBeInTheDocument();

    // Add a new item
    const itemNameInput = screen.getByPlaceholderText("Item Name");
    const itemQuantityInput = screen.getByPlaceholderText("Quantity");
    const itemAddButton = screen.getByText("Add Item");
    fireEvent.change(itemNameInput, { target: { value: "Test Item" } });
    fireEvent.change(itemQuantityInput, { target: { value: 5 } });
    fireEvent.click(itemAddButton);

    // Ensure the item is added
    const itemList = screen.getByRole("list"); // Scoped to the item list
    const item = within(itemList).getByText("Test Item (Quantity: 5)");
    expect(item).toBeInTheDocument();
  });
});