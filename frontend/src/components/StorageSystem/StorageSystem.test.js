import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import StorageSystem from "./StorageSystem";

describe("StorageSystem", () => {
  it("updates selectedStorage state and calls onStorageSelect when a storage system is selected", () => {
    const mockOnStorageSelect = jest.fn();
    render(<StorageSystem selectedGame="Test Game" onStorageSelect={mockOnStorageSelect} />);

    const input = screen.getByPlaceholderText("Add a new storage system");
    const addButton = screen.getByText("Add Storage System");

    fireEvent.change(input, { target: { value: "Inventory" } });
    fireEvent.click(addButton);

    const dropdown = screen.getByLabelText("Choose a storage system:");
    fireEvent.change(dropdown, { target: { value: "Inventory" } });

    expect(mockOnStorageSelect).toHaveBeenCalledWith("Inventory");
  });

  it("adds a new storage system to the list when valid input is provided", () => {
    render(<StorageSystem selectedGame="Test Game" onStorageSelect={() => {}} />);

    const input = screen.getByPlaceholderText("Add a new storage system");
    const addButton = screen.getByText("Add Storage System");

    fireEvent.change(input, { target: { value: "New Storage" } });
    fireEvent.click(addButton);

    // Check that "New Storage" is present in the dropdown
    const dropdown = screen.getByLabelText("Choose a storage system:");
    const dropdownOption = within(dropdown).getByText("New Storage");
    expect(dropdownOption).toBeInTheDocument();

    // Check that "New Storage" is present in the list
    const list = screen.getByRole("list");
    const listItem = within(list).getByText("New Storage");
    expect(listItem).toBeInTheDocument();
  });

  it("does not add a storage system if it already exists", () => {
    render(<StorageSystem selectedGame="Test Game" onStorageSelect={() => {}} />);

    const input = screen.getByPlaceholderText("Add a new storage system");
    const addButton = screen.getByText("Add Storage System");

    fireEvent.change(input, { target: { value: "Duplicate Storage" } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: "Duplicate Storage" } });
    fireEvent.click(addButton);

    // Ensure only one "Duplicate Storage" is present in the list
    const list = screen.getByRole("list");
    const listItems = within(list).queryAllByText("Duplicate Storage");
    expect(listItems.length).toBe(1);
  });

  it("deletes a storage system from the list", () => {
    render(<StorageSystem selectedGame="Test Game" onStorageSelect={() => {}} />);

    const input = screen.getByPlaceholderText("Add a new storage system");
    const addButton = screen.getByText("Add Storage System");

    fireEvent.change(input, { target: { value: "Test Storage" } });
    fireEvent.click(addButton);

    // Ensure "Test Storage" is added to the list
    const list = screen.getByRole("list");
    const listItem = within(list).getByText("Test Storage");
    expect(listItem).toBeInTheDocument();

    // Find the delete button for "Test Storage" and click it
    const deleteButton = within(listItem.closest("li")).getByText("Delete");
    fireEvent.click(deleteButton);

    // Ensure "Test Storage" is no longer in the list
    expect(within(list).queryByText("Test Storage")).not.toBeInTheDocument();
  });
});