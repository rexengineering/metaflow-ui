import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import AccountManagerInfo from ".";
import managerData from "./mockData";

describe("<AccountManagerInfo />", () => {
  const rendersAccountManagerInfoComponent = (
    onTransferCallClick = managerData.onTransferCallClick
  ) => {
    return (
      <AccountManagerInfo
        address={managerData.address}
        name={managerData.name}
        phoneNumber={managerData.phoneNumber}
        roleType={managerData.role}
        onTransferCallClick={onTransferCallClick}
      />
    );
  };

  it("should render", () => {
    const { asFragment } = render(rendersAccountManagerInfoComponent());
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(rendersAccountManagerInfoComponent());
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should handle onTransferCallClick properly", () => {
    const onTransferCallClick = jest.fn();
    render(rendersAccountManagerInfoComponent(onTransferCallClick));
    const transferCallButton = screen.getByRole("button");
    expect(transferCallButton).toBeInTheDocument();
    fireEvent.click(transferCallButton);
    expect(onTransferCallClick).toBeCalled();
  });
});
