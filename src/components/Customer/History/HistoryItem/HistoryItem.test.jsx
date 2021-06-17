import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { faAccessibleIcon } from "@fortawesome/free-brands-svg-icons";
import HistoryItem from ".";

describe("<HistoryItem />", () => {
  const date = "12/20/93";
  const label = "Test Label";
  const renderHistoryItemComponent = (onClick = () => {}) => {
    return (
      <HistoryItem
        icon={faAccessibleIcon}
        color="blue"
        date={date}
        label={label}
        onClick={onClick}
      />
    );
  };

  it("should render", () => {
    const { asFragment } = render(renderHistoryItemComponent());
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(renderHistoryItemComponent());
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should render provided label", () => {
    render(renderHistoryItemComponent());
    const labelNode = screen.getByText(label);
    expect(labelNode).toBeInTheDocument();
  });

  it("should render provided date", () => {
    render(renderHistoryItemComponent());
    const dateNode = screen.getByText(date);
    expect(dateNode).toBeInTheDocument();
  });

  it("should handle provided onClick func", () => {
    const onClick = jest.fn();
    render(renderHistoryItemComponent(onClick));
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(onClick).toBeCalled();
  });
});
