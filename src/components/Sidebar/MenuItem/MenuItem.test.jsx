import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { faAbacus } from "@fortawesome/pro-solid-svg-icons/faAbacus";
import MenuItem from "./MenuItem";

describe("<CustomMenuItem />", () => {
  const renderMenuItemComponent = (onClick = () => {}) => (
    <MenuItem onClick={onClick} isActive icon={faAbacus} />
  );

  it("should render", () => {
    const { asFragment } = render(renderMenuItemComponent());
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(renderMenuItemComponent());
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should handle click event properly", () => {
    const onClick = jest.fn();
    render(renderMenuItemComponent(onClick));
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it("should render an icon", () => {
    render(renderMenuItemComponent());
    const iconNode = screen.getByRole("img", { hidden: true });
    expect(iconNode).toBeInTheDocument();
  });
});
