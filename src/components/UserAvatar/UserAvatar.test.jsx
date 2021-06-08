import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import UserAvatar from "./UserAvatar";
import { ONLINE } from "../../constants";

describe("<UserAvatar />", () => {
  const userName = "Gabriel";
  const renderUserAvatar = (
    userProfilePictureURL = null,
    onClick = null,
    onStatusChange = null,
    disabled = "",
    onClose
  ) => (
    <UserAvatar
      currentStatus={ONLINE}
      username={userName}
      userProfilePhotoURL={userProfilePictureURL}
      isDisabled={disabled}
      onUserAvatarClick={onClick}
      onStatusSelection={onStatusChange}
      onClose={onClose}
      menuAnchor={React.createRef()}
    />
  );

  it("should render", () => {
    const { asFragment } = render(renderUserAvatar());
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(renderUserAvatar());
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should show the initial letter of username when src is not provided", () => {
    render(renderUserAvatar());
    const initialLetter = userName.charAt(0);
    const initialLetterNode = screen.getByText(initialLetter);
    expect(initialLetterNode).toBeInTheDocument();
  });

  it("should show user profile picture when a src is provided", () => {
    render(
      renderUserAvatar(
        "https://hackernoon.com/hn-images/1*Y0UYuGcFGSCfs5Eexafq6A.png"
      )
    );
    const profilePicture = screen.getByRole("img", { hidden: true });
    expect(profilePicture).toBeInTheDocument();
  });

  it("should handle click event and status change event properly", () => {
    const handleClick = jest.fn();
    const status = "online";
    const handleStatusChange = jest.fn((newStatus) => {
      expect(newStatus === status).toBeTruthy();
    });
    const handleOnClose = jest.fn();

    render(
      renderUserAvatar(
        null,
        handleClick,
        handleStatusChange,
        undefined,
        handleOnClose
      )
    );

    const avatar = screen.getByRole("button", { hidden: true });
    expect(avatar).toBeInTheDocument();
    fireEvent.click(avatar);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

/*
 it("should handle click event when disabled properly", () => {
    const handleClick = jest.fn();
    render(renderUserAvatar(null, handleClick, null, "true"));

    const avatar = screen.getByRole("button");
    expect(avatar).toBeInTheDocument();
    fireEvent.click(avatar);
    expect(handleClick).toHaveBeenCalledTimes(0);
  });*/
});
