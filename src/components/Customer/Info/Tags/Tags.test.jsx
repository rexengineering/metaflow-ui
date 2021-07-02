import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import Tags from "./Tags";
import tagsItems from "./mockData";

describe("<TagsInfo />", () => {
  const renderTagsComponent = (onClick = undefined, tags = tagsItems) => {
    return (
      <Tags
        tagsItems={tags}
        onAddTagsButtonClicked={onClick}
        className="name"
      />
    );
  };

  it("should render", () => {
    const { asFragment } = render(renderTagsComponent());
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(renderTagsComponent());
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should render all passed tag items", () => {
    render(renderTagsComponent());
    tagsItems.forEach((tag) => {
      const tagNode = screen.getByText(tag);
      expect(tagNode).toBeInTheDocument();
    });
  });

  it("should trigger the passed onClick function when clicked", () => {
    const onClick = jest.fn();
    render(renderTagsComponent(onClick));
    const element = screen.getByRole("button");
    fireEvent.click(element);

    expect(onClick).toHaveBeenCalled();
  });
});
