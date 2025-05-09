import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StorageSystem from "./StorageSystem";

describe("StorageSystem - handleSelectStorage", () => {
  it("updates selectedStorage state and calls onStorageSelect when a storage system is selected", () => {
    const mockOnStorageSelect = jest.fn();
    render(<StorageSystem selectedGame="Test Game" onStorageSelect={mockOnStorageSelect} />);

    const dropdown = screen.getByLabelText("Choose a storage system:");
    const option = document.createElement("option");
    option.value = "Test Storage";
    option.text = "Test Storage";
    dropdown.appendChild(option);

    fireEvent.change(dropdown, { target: { value: "Test Storage" } });

    expect(mockOnStorageSelect).toHaveBeenCalledWith("Test Storage");
  });
});