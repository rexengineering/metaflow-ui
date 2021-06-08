import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { Typography } from "@material-ui/core";
import InfoSection from "./InfoSection";

describe("<ActionItem />", () => {
  const renderInfoSectionComponent = (
    title = "Section title",
    onAddIconClicked = () => {},
    children = "Child text"
  ) => (
    <InfoSection title={title} onAddIconClicked={onAddIconClicked}>
      {children}
    </InfoSection>
  );

  it("should render", () => {
    const { asFragment } = render(renderInfoSectionComponent());
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(renderInfoSectionComponent());
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should render provided title", () => {
    const title = "This is a title";
    render(renderInfoSectionComponent(title));
    const titleNode = screen.getByText(title);
    expect(titleNode).toBeInTheDocument();
  });

  it("should render provided child", () => {
    const childText = "This is a simple paragraph";
    render(
      renderInfoSectionComponent(
        "title",
        () => {},
        <Typography>{childText}</Typography>
      )
    );
    const childNode = screen.getByText(childText);
    expect(childNode).toBeInTheDocument();
  });

  it("should handle onAddIconClicked properly", () => {
    const onAddIconClicked = jest.fn();
    render(renderInfoSectionComponent("New title", onAddIconClicked));
    const buttonNode = screen.getByRole("button");
    fireEvent.click(buttonNode);
    expect(onAddIconClicked).toBeCalled();
  });
});
