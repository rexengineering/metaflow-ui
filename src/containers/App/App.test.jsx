import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App, { MISC_DRAWER_WIDTH } from "./App";
import userEvent from "@testing-library/user-event";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

describe("<App />", () => {
  it("should render", () => {
    const { asFragment } = render(<App />);
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(<App />);
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should start with the misc drawer closed" , () => {
    render(<App />);
    const drawer = screen.getByTestId("misc-drawer").querySelector(".MuiDrawer-paper");
    expect(drawer).toHaveStyle("visibility: hidden");
  });


  it("should toggle the misc drawer when its button is pressed" , async () => {
    render(<App />);
    const drawer = screen.getByTestId("misc-drawer").querySelector(".MuiDrawer-paper");
    const drawerToggleButton = screen.getByTestId("drawer-toggle-button");

    expect(drawer).not.toHaveStyle("transform: none");
    await waitFor(() => {
      userEvent.click(drawerToggleButton);
    });
    expect(drawer).toHaveStyle("transform: none");
    await waitFor(() => {
      userEvent.click(drawerToggleButton);
    });
    expect(drawer).not.toHaveStyle("transform: none");;
  });


  it("should resize the content based on drawer state" , async () => {
    render(<App />);
    const drawer = screen.getByTestId("misc-drawer").querySelector(".MuiDrawer-paper");
    const drawerToggleButton = screen.getByTestId("drawer-toggle-button");
    const content = screen.getByTestId("tray2");

    expect(drawer).toHaveStyle(`width: ${MISC_DRAWER_WIDTH}px`);
    expect(content).not.toHaveStyle(`margin-right: ${MISC_DRAWER_WIDTH}px`);

    await waitFor(() => {
      userEvent.click(drawerToggleButton);
    });
    expect(content).toHaveStyle(`margin-right: ${MISC_DRAWER_WIDTH}px`);

    await waitFor(() => {
      userEvent.click(drawerToggleButton);
    });
    expect(content).not.toHaveStyle(`margin-right: ${MISC_DRAWER_WIDTH}px`);
  });
});
