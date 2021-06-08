import { render, screen } from "@testing-library/react";
import React from "react";
import { Typography } from "@material-ui/core";
import Tray from ".";

describe("<Tray />", () => {
  const renderTrayComponent = (content = "") => (
    <Tray>
      <Typography>{content}</Typography>
    </Tray>
  );

  it("should render", () => {
    const { asFragment } = render(renderTrayComponent());
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(renderTrayComponent());
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should render a child element properly", () => {
    const content = "Tray test";
    render(renderTrayComponent(content));
    const child = screen.getByText(content);
    expect(child).toBeInTheDocument();
  });
});
