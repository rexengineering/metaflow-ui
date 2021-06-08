import { render, screen } from "@testing-library/react";
import React from "react";
import { Typography } from "@material-ui/core";
import ActionCard from "./index";

describe("<ActionCard />", () => {
  const renderActionCardComponent = (content = "") => (
    <ActionCard>
      <Typography>{content}</Typography>
    </ActionCard>
  );

  it("should render", () => {
    const { asFragment } = render(renderActionCardComponent());
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(renderActionCardComponent());
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should render a child element properly", () => {
    const content = "ActionCard test";
    render(renderActionCardComponent(content));
    const child = screen.getByText(content);
    expect(child).toBeInTheDocument();
  });
});
