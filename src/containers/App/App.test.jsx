import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

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

  it("should render a learn react link", () => {
    render(<App />);
    const linkElement = screen.getByRole("link");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent(/learn react/i);
  });
});
