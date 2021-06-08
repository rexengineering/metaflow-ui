import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

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
});
