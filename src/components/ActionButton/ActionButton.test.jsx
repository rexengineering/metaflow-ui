import React from "react";
import { render, screen } from "@testing-library/react";
import ActionButton from ".";

describe("<ActionButton />", () => {
  it("should render", () => {
    const { asFragment } = render(<ActionButton>Copy</ActionButton>);
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(<ActionButton>Copy</ActionButton>);
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should show a loader if isLoading", () => {
    render(<ActionButton isLoading>Copy</ActionButton>);

    const button = screen.queryByText("Copy");
    expect(button).not.toBeInTheDocument();
  });
});
