import { render, screen } from "@testing-library/react";
import React from "react";
import History from "./History";
import { CustomerHistory, Months } from "./mockData";

describe("<History />", () => {
  const renderHistoryComponent = (onHistoryItemSelected = () => {}) => {
    return (
      <History
        historyItems={CustomerHistory}
        months={Months}
        onHistoryItemSelected={onHistoryItemSelected}
      />
    );
  };

  it("should render", () => {
    const { asFragment } = render(renderHistoryComponent());
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should render all given elements", () => {
    render(renderHistoryComponent());
    Months.forEach((month) =>
      expect(screen.getByText(month)).toBeInTheDocument()
    );
  });

  it("should render all given elements", () => {
    render(renderHistoryComponent());
    Months.forEach((month) =>
      expect(screen.getByText(month)).toBeInTheDocument()
    );
  });
});
