import Home from "src/pages/index";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Homepage", () => {
  it("renders a title", () => {
    render(<Home />);
    // check if all components are rendered
    expect(screen.getByTestId("title")).toBeInTheDocument();
  });
})