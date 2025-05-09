import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
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

    const gameInput = screen.getByPlaceholderText("Add a new game");
    const gameAddButton = screen.getByText("Add Game");

    fireEvent.change(gameInput, { target: { value: "Test Game" } });
    fireEvent.click(gameAddButton);

    const storageInput = screen.getByPlaceholderText("Add a new storage system");
    const storageAddButton = screen.getByText("Add Storage System"); 
    fireEvent.click(storageAddButton);

    const itemNameInput = screen.getByPlaceholderText("Item Name");
    const itemQuantityInput = screen.getByPlaceholderText("Quantity");
    const itemAddButton = screen.getByText("Add Item");

    fireEvent.change(itemNameInput, { target: { value: "Test Item" } });
    fireEvent.change(itemQuantityInput, { target: { value: 5 } });
    fireEvent.click(itemAddButton);

    expect(screen.getByText("Test Item (Quantity: 5)")).toBeInTheDocument();
  });
});