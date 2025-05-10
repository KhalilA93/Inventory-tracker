import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import ParentComponent from "./ParentComponent";

describe("ParentComponent", () => {
  afterEach(() => {
    // Cleanup the DOM after each test
    document.body.innerHTML = "";
  });

  it("renders child components correctly", () => {
    render(<ParentComponent />);

    expect(screen.getByText("Game Component")).toBeInTheDocument();
    expect(screen.getByText("Storage System")).toBeInTheDocument();
    expect(screen.getByText("Item Component")).toBeInTheDocument();
  });

  it("handles interactions with the GameComponent", () => {
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
    fireEvent.change(gameDropdown, { target: { value: "Test Game" } });
  });
});