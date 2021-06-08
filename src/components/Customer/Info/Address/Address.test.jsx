import { render, screen } from "@testing-library/react";
import React from "react";
import Address from "./Address";

describe("<Address />", () => {
  const renderAddress = (address = "Mty 156") => {
    return <Address address={address} />;
  };

  it("should render", () => {
    const { asFragment } = render(renderAddress());
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(renderAddress());
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should render provided Address", () => {
    const address = "MX 1528";
    render(renderAddress(address));
    const addressNode = screen.getByText(address);
    expect(addressNode).toBeInTheDocument();
  });
});
