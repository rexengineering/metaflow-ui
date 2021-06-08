import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { ActionItemDeleteType } from "../../constants";
import ActionItem from "./index";

describe("<ActionItem />", () => {
  const renderActionItemComponent = (
    label = "Direct Buyer",
    actionType = ActionItemDeleteType,
    onAction = () => {}
  ) => <ActionItem label={label} actionType={actionType} onAction={onAction} />;

  it("should render", () => {
    const { asFragment } = render(renderActionItemComponent());
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(renderActionItemComponent());
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should render provided label", () => {
    const label = "New house!";
    render(renderActionItemComponent(label));
    const labelNode = screen.getByText(label);
    expect(labelNode).toBeInTheDocument();
  });

  it("should handle onAction properly", () => {
    const onAction = jest.fn();
    render(
      renderActionItemComponent("New house", ActionItemDeleteType, onAction)
    );
    const buttonNode = screen.getByRole("button");
    fireEvent.click(buttonNode);
    expect(onAction).toBeCalled();
  });
});
