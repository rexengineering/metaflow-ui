import { render } from "@testing-library/react";
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
});
