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
