import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GameComponent from "./GameComponent";

describe("GameComponent - handleSelectGame", () => {
  it("updates selectedGame state and calls onGameSelect when a game is selected", () => {
    const mockOnGameSelect = jest.fn(); // Mock the onGameSelect function
    render(
      <GameComponent onGameSelect={mockOnGameSelect} />
    );

    // Add a mock option to the dropdown for testing
    const dropdown = screen.getByLabelText("Choose a game:");
    const option = document.createElement("option");
    option.value = "Test Game";
    option.text = "Test Game";
    dropdown.appendChild(option);

    fireEvent.change(dropdown, { target: { value: "Test Game" } });

    // Check that the selected game is updated
    expect(screen.getByText("Test Game")).toBeInTheDocument();

    // Check that the onGameSelect function is called with the correct value
    expect(mockOnGameSelect).toHaveBeenCalledWith("Test Game");
  });
});
