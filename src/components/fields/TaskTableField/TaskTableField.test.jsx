import { render, screen } from "@testing-library/react";
import React from "react";
import TaskTableField from ".";
import { DATA_ERROR_MESSAGE } from "./TaskTableField";

const validJson = JSON.stringify({
  heading: ["item1", "item2", "item3"],
  body: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
});

describe("<TaskTextField />", () => {
  it("should render", () => {
    const { asFragment } = render(<TaskTableField />);
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(<TaskTableField data={validJson} />);
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should render a table for valid JSON", () => {
    render(<TaskTableField data={validJson} />);

    const rows = screen.queryAllByTestId("table-row");
    rows.forEach((row, rowIndex) => {
      const cells = row.querySelectorAll('[data-testid="table-row"]');
      cells.forEach((cell, cellIndex) => {
        expect(cell).toHaveTextContent(validJson.body[rowIndex][cellIndex]);
      });
    });
  });

  it("should render an error message for invalid JSON", () => {
    render(<TaskTableField data="invalid json" />);

    const row = screen.queryByTestId("table-row");
    expect(row).toHaveTextContent(DATA_ERROR_MESSAGE);
  });

  it("should render a heading if supplied in the JSON", () => {
    render(<TaskTableField data={validJson} />);

    const heading = screen.queryByTestId("table-heading");
    const cells = heading.querySelectorAll('[data-testid="table-row"]');
    cells.forEach((cell, cellIndex) => {
      expect(cell).toHaveTextContent(validJson.heading[cellIndex]);
    });
  });
});
