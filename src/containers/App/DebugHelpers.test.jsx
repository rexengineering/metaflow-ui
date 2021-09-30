import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import DebugHelpers from "./DebugHelpers";
import getStore from "../../rexui/store";

describe("<DebugHelpers />", () => {
  const wrappedDebugHelpers = (props, store = getStore({})) => (
    <Provider store={store}>
      <DebugHelpers {...props} />
    </Provider>
  );

  it("should render", () => {
    const { asFragment } = render(wrappedDebugHelpers());
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(wrappedDebugHelpers());
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should render elements for every deployment", () => {
    const deployments = ["deploymentId1", "deploymentId2", "deploymentId3"];
    render(wrappedDebugHelpers({ deployments }));
    const deploymentElements = screen.getAllByTestId("deployment");

    expect(deploymentElements).toHaveLength(deployments.length);
  });

  it("should dispatch fetchTasks when update state button is pressed", async () => {
    // const setIsAutomaticState = jest.fn()
    // const updateButton = screen.getByTestId("update-state-button");
    //
    // await waitFor(() => {
    //   userEvent.click(updateButton);
    // })
    // expect().toHaveBeenCalled();
  });

  it("should dispatch setIsAutomaticState when toggle state button is pressed", async () => {
    const setIsAutomaticState = jest.fn()
    render(wrappedDebugHelpers({ setIsAutomaticState }));
    const toggleButton = screen.getByTestId("toggle-state-button");

    await waitFor(() => {
      userEvent.click(toggleButton);
    })
    expect(setIsAutomaticState).toHaveBeenCalled();
  });
});
