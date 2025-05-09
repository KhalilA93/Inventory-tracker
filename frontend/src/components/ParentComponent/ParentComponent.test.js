import React from "react";
import { render } from "@testing-library/react";
import ParentComponent from "./ParentComponent";

describe("ParentComponent", () => {
  it("renders child components correctly", () => {
    const { getByText } = render(<ParentComponent />);

    expect(getByText("Game Component")).toBeInTheDocument();
    expect(getByText("Storage System")).toBeInTheDocument();
    expect(getByText("Item Component")).toBeInTheDocument();
  });
});