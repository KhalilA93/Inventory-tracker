import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GameComponent from "./GameComponent";

describe("GameComponent - handleSelectGame", () => {
  it("updates selectedGame state and calls onGameSelect when a game is selected", () => {
    const mockOnGameSelect = jest.fn();
    render(<GameComponent onGameSelect={mockOnGameSelect} />);

    const dropdown = screen.getByLabelText("Choose a game:");
    const option = document.createElement("option");
    option.value = "Test Game";
    option.text = "Test Game";
    dropdown.appendChild(option);

    fireEvent.change(dropdown, { target: { value: "Test Game" } });

    expect(mockOnGameSelect).toHaveBeenCalledWith("Test Game");
  });
});

describe("GameComponent - handleAddGame", () => {
  it("adds a new game to the list when valid input is provided", () => {
    render(<GameComponent onGameSelect={() => {}} />);

    const input = screen.getByPlaceholderText("Add a new game");
    const addButton = screen.getByText("Add Game");

    fireEvent.change(input, { target: { value: "New Game" } });
    fireEvent.click(addButton);

    expect(screen.getByText("New Game")).toBeInTheDocument();
  });

  it("does not add a game if it already exists", () => {
    render(<GameComponent onGameSelect={() => {}} />);

    const input = screen.getByPlaceholderText("Add a new game");
    const addButton = screen.getByText("Add Game");

    fireEvent.change(input, { target: { value: "Existing Game" } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: "Existing Game" } });
    fireEvent.click(addButton);

    expect(screen.queryAllByText("Existing Game").length).toBe(1);
  });
});
