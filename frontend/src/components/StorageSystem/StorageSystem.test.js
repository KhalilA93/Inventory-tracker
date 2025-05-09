import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import StorageSystem from "./StorageSystem";

describe("StorageSystem - handleSelectStorage", () => {
  it("updates selectedStorage state and calls onStorageSelect when a storage system is selected", () => {
    const mockOnStorageSelect = jest.fn();
    render(<StorageSystem selectedGame="Test Game" onStorageSelect={mockOnStorageSelect} />);

    const dropdown = screen.getByLabelText("Choose a storage system:");
    fireEvent.change(dropdown, { target: { value: "Inventory" } });

    expect(mockOnStorageSelect).toHaveBeenCalledWith("Inventory");
  });
});

describe("StorageSystem - handleDeleteStorage", () => {
  it("deletes a storage system from the list", () => {
    render(<StorageSystem selectedGame="Test Game" onStorageSelect={() => {}} />);

    const input = screen.getByPlaceholderText("Add a new storage system");
    const addButton = screen.getByText("Add Storage System");

    fireEvent.change(input, { target: { value: "Test Storage" } });
    fireEvent.click(addButton);

    // Ensure "Test Storage" is added
    expect(screen.getByText("Test Storage")).toBeInTheDocument();

    // Find the delete button for "Test Storage" and click it
    const list = screen.getByRole("list");
    const listItem = within(list).getByText("Test Storage");
    const deleteButton = within(listItem.closest("li")).getByText("Delete");
    fireEvent.click(deleteButton);

    // Ensure "Test Storage" is no longer in the document
    expect(screen.queryByText("Test Storage")).not.toBeInTheDocument();
  });
});