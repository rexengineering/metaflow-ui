import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SideBar from "./Sidebar";
import svgLogo from "../../assets/prism.svg";
import menuItems from "./mockData";

describe("<SideBar />", () => {
  const renderSideBar = (onMenuItemClicked = () => {}) => (
    <SideBar
      onMenuItemClicked={onMenuItemClicked}
      logo={svgLogo}
      menuItems={menuItems}
    />
  );

  it("should render", () => {
    const { asFragment } = render(renderSideBar());
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(renderSideBar());
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should render a logo", () => {
    render(renderSideBar());
    const logo = screen.getByRole("img");

    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src");
  });

  it("should render all passed menu items", () => {
    render(renderSideBar());

    const buttons = screen.getAllByRole("button");
    expect(buttons.length === menuItems.length).toBeTruthy();
  });

  it("should handle all click events properly", () => {
    const onMenuItemClicked = jest.fn();
    render(renderSideBar(onMenuItemClicked));
    const activeButtonsCount = menuItems.filter(
      ({ isActive }) => isActive
    ).length;
    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      fireEvent.click(button);
    });
    expect(onMenuItemClicked).toHaveBeenCalledTimes(activeButtonsCount);
  });
});
