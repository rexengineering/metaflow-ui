import { render, screen } from "@testing-library/react";
import React from "react";
import TaskTypographyField from ".";

describe("<TaskTypographyField />", () => {
  it("should render", () => {
    const { asFragment } = render(<TaskTypographyField />);
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(<TaskTypographyField data="sometext" />);
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should render the supplies text", () => {
    render(<TaskTypographyField data="sometext" />);

    const element = screen.getByText("sometext");
    expect(element).toBeInTheDocument();
  });
});
