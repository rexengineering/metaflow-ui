import { render, screen } from "@testing-library/react";
import React from "react";
import { Typography } from "@material-ui/core";
import Panel from ".";

describe("<Panel />", () => {
  const renderPanelComponent = (content = "") => (
    <Panel>
      <Typography>{content}</Typography>
    </Panel>
  );

  it("should render", () => {
    const { asFragment } = render(renderPanelComponent());
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(renderPanelComponent());
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should render a child element properly", () => {
    const content = "Panel child test";
    render(renderPanelComponent(content));
    const child = screen.getByText(content);
    expect(child).toBeInTheDocument();
  });
});
