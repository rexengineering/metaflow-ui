import { render, screen } from "@testing-library/react";
import React from "react";
import { Typography } from "@material-ui/core";
import Pane from ".";

describe("<Pane />", () => {
  const renderPaneComponent = (content = "") => (
    <Pane>
      <Typography>{content}</Typography>
    </Pane>
  );

  it("should render", () => {
    const { asFragment } = render(renderPaneComponent());
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(renderPaneComponent());
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should render a child element properly", () => {
    const content = "Pane test";
    render(renderPaneComponent(content));
    const child = screen.getByText(content);
    expect(child).toBeInTheDocument();
  });
});
