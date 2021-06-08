import { render } from "@testing-library/react";
import React from "react";
import CleaveInput from ".";

describe("<CleaveInput />", () => {
  it("should render", () => {
    const { asFragment } = render(<CleaveInput />);
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(<CleaveInput />);
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });
});
