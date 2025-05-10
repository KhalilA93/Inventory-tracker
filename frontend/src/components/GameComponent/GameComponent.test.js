import React from "react";
import { render, screen, fireEvent, cleanup, within } from "@testing-library/react";
import GameComponent from "./GameComponent";

describe("GameComponent", () => {
  afterEach(() => {
    // Cleanup the DOM after each test
    cleanup();
  });

  it("renders the game dropdown and allows selecting a game", () => {
    const mockOnGameSelect = jest.fn();
    render(<GameComponent onGameSelect={mockOnGameSelect} />);

    const dropdown = screen.getByLabelText("Game Dropdown");
    expect(dropdown).toBeInTheDocument();

    const option = document.createElement("option");
    option.value = "Test Game";
    option.text = "Test Game";
    dropdown.appendChild(option);

    fireEvent.change(dropdown, { target: { value: "Test Game" } });
    expect(mockOnGameSelect).toHaveBeenCalledWith("Test Game");
  });

  it("adds a new game to the list when valid input is provided", () => {
    render(<GameComponent onGameSelect={() => {}} />);

    const input = screen.getByPlaceholderText("Add a new game");
    const addButton = screen.getByText("Add Game");

    fireEvent.change(input, { target: { value: "New Game" } });
    fireEvent.click(addButton);

    // Check that "New Game" is present in both the dropdown and the list
    const dropdown = screen.getByLabelText("Choose a game:");
    const dropdownOption = within(dropdown).getByText("New Game");
    expect(dropdownOption).toBeInTheDocument();

    const list = screen.getByRole("list");
    const listItem = within(list).getByText("New Game");
    expect(listItem).toBeInTheDocument();
  });

  it("does not add a game if it already exists", () => {
    render(<GameComponent onGameSelect={() => {}} />);

    const input = screen.getByPlaceholderText("Add a new game");
    const addButton = screen.getByText("Add Game");

    fireEvent.change(input, { target: { value: "Existing Game" } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: "Existing Game" } });
    fireEvent.click(addButton);

    // Ensure only one "Existing Game" is present in the list
    const list = screen.getByRole("list");
    const listItems = within(list).queryAllByText("Existing Game");
    expect(listItems.length).toBe(1);
  });

  it("deletes a game from the list", () => {
    render(<GameComponent onGameSelect={() => {}} />);

    const input = screen.getByPlaceholderText("Add a new game");
    const addButton = screen.getByText("Add Game");

    fireEvent.change(input, { target: { value: "Game to Delete" } });
    fireEvent.click(addButton);

    const deleteButton = screen.getByText("Delete", { selector: "button" });
    fireEvent.click(deleteButton);

    const list = screen.getByRole("list");
    const listItem = within(list).queryByText("Game to Delete");
    expect(listItem).not.toBeInTheDocument();
  });
});
