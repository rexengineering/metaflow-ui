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
      activeMenuItemId={menuItems[0].id}
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
    const items = screen.getAllByTestId("menu-item");
    items.forEach((item) => {
      fireEvent.click(item);
    });
    expect(onMenuItemClicked).toHaveBeenCalledTimes(menuItems.length);
  });
});
