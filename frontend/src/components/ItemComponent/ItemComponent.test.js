import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import ItemComponent from "./ItemComponent";

describe("ItemComponent - handleAddItem", () => {
  it("adds a new item to the list when valid inputs are provided", () => {
    render(<ItemComponent selectedGame="Test Game" selectedStorage="Test Storage" />);

    const itemNameInput = screen.getByPlaceholderText("Item Name");
    const itemQuantityInput = screen.getByPlaceholderText("Quantity");
    const addButton = screen.getByText("Add Item");

    fireEvent.change(itemNameInput, { target: { value: "Test Item" } });
    fireEvent.change(itemQuantityInput, { target: { value: 5 } });
    fireEvent.click(addButton);

    const itemList = screen.getByRole("list", { name: "Items" });
    expect(within(itemList).getByText("Test Item (Quantity: 5)")).toBeInTheDocument();
  });
});

describe("ItemComponent - handleDeleteItem", () => {
  it("deletes an item from the list", () => {
    render(<ItemComponent selectedGame="Test Game" selectedStorage="Test Storage" />);

    const itemNameInput = screen.getByPlaceholderText("Item Name");
    const itemQuantityInput = screen.getByPlaceholderText("Quantity");
    const addButton = screen.getByText("Add Item");

    fireEvent.change(itemNameInput, { target: { value: "Test Item" } });
    fireEvent.change(itemQuantityInput, { target: { value: 5 } });
    fireEvent.click(addButton);

    const deleteButton = screen.getByText("Delete", { selector: "button" });
    fireEvent.click(deleteButton);

    expect(screen.queryByText("Test Item (Quantity: 5)")).not.toBeInTheDocument();
  });
});