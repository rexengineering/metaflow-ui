import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Typography } from "@material-ui/core";
import { BUSY, OFFLINE, ONLINE } from "../../../constants";
import UserMenu from "./UserMenu";

describe("<UserMenu />", () => {
  const mockedStatuses = {
    [ONLINE]: "ONLINE",
    [OFFLINE]: "OFFLINE",
    [BUSY]: "BUSY",
  };

  const props = {
    status: BUSY,
    statuses: mockedStatuses,
    menuAnchor: <Typography>Menu</Typography>,
    onMenuClose: () => {},
    onStatusSelection: () => {},
  };

  const renderUserMenu = ({
    status,
    statuses,
    menuAnchor,
    onMenuClose,
    onStatusSelection,
  } = props) => (
    <UserMenu
      status={status}
      statuses={statuses}
      menuAnchor={menuAnchor}
      onMenuClose={onMenuClose}
      onStatusSelection={onStatusSelection}
    />
  );

  it("should render", () => {
    const { asFragment } = render(renderUserMenu());
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(renderUserMenu());
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should render all given statuses", () => {
    render(renderUserMenu());
    const statusesKeys = Object.keys(mockedStatuses);
    statusesKeys.forEach((status) =>
      expect(screen.getByText(status)).toBeInTheDocument()
    );
  });

  it("should handle onClick properly", async () => {
    const onStatusSelection = jest.fn();
    render(renderUserMenu({ ...props, onStatusSelection }));
    const statusesKeys = Object.keys(mockedStatuses);

    await waitFor(() =>
      statusesKeys.forEach((status) => {
        const statusNode = screen.getByText(status);
        fireEvent.click(statusNode);
      })
    );
    expect(onStatusSelection).toHaveBeenCalledTimes(statusesKeys.length);
  });
});
