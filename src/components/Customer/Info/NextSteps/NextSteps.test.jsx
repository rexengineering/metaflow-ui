import { render, screen } from "@testing-library/react";
import React from "react";
import NextSteps from ".";
import nextStepsMock from "./mockData";

describe("<NextSteps />", () => {
  const renderNextStepsComponent = (
    onAddNextStepsButtonClicked = () => {},
    onNextStepsSelected = () => {}
  ) => {
    return (
      <NextSteps
        onAddNextStepsButtonClicked={onAddNextStepsButtonClicked}
        onNextStepsSelected={onNextStepsSelected}
        nextSteps={nextStepsMock}
      />
    );
  };

  it("should render", () => {
    const { asFragment } = render(renderNextStepsComponent());
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(renderNextStepsComponent());
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should render all passed items", () => {
    render(renderNextStepsComponent());
    nextStepsMock.forEach((nextStep) => {
      const nextStepNode = screen.getByText(nextStep);
      expect(nextStepNode).toBeInTheDocument();
    });
  });
});
