import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import WorkflowInstantiator from "./WorkflowInstantiator";
import getStore from "../../store";

describe("<WorkflowInstantiator />", () => {
  const renderWorkflowInstantiator = (store = getStore({})) => (
    <Provider store={store}>
      <WorkflowInstantiator deploymentID="1681321" />
    </Provider>
  );

  it("should render", () => {
    const { asFragment } = render(renderWorkflowInstantiator());
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(renderWorkflowInstantiator());
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });
});
