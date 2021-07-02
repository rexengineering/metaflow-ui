import { render, screen, fireEvent } from "@testing-library/react";
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

  it("should fire the passed function when clicked", () => {
    const onClick = jest.fn();
    render(renderHistoryComponent(onClick));

    const buttons = screen
      .getAllByTestId("item")
      .map((element) => element.querySelector("button"));

    buttons.forEach((button) => {
      onClick.mockClear();
      fireEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
