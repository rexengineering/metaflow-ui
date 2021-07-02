import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import Workflow from "./Workflow";
import getStore from "../../store";

describe("<Workflow />", () => {
  const renderWorkflow = (store = getStore({})) => (
    <Provider store={store}>
      <Workflow className="workflow" workflowID="456456" />
    </Provider>
  );

  it("should render", () => {
    const { asFragment } = render(renderWorkflow());
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(renderWorkflow());
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should render a title for the workflow", () => {
    render(renderWorkflow());
    const element = screen.getByText("456456");

    expect(element).toBeInTheDocument();
  });
});
