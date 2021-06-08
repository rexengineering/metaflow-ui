import { render, screen } from "@testing-library/react";
import React from "react";
import Tags from "./Tags";
import tagsItems from "./mockData";

describe("<TagsInfo />", () => {
  const renderTagsComponent = () => {
    return <Tags tagsItems={tagsItems} />;
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
});
