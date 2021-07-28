import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Button } from "@material-ui/core";
import TalkTracks from ".";
import userEvent from "@testing-library/user-event";
import getStore from "../../store";
import { Provider } from "react-redux";

describe("<TalkTracks />", () => {
  const wrappedTalkTracks = (props, store = getStore({})) => (
    <Provider store={store}>
      <TalkTracks {...props} />
    </Provider>
  );

  it("should render", () => {
    const { asFragment } = render(wrappedTalkTracks());
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(wrappedTalkTracks());
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should render a header action if passed", async () => {
    const onClick = jest.fn();
    const action = <Button data-testid="header-action" onClick={onClick}>Action</Button>
    render(wrappedTalkTracks({ headerAction: action }));
    const headerAction = screen.getByTestId("header-action");

    expect(headerAction).toMatchSnapshot();
    await waitFor(() => {
      userEvent.click(headerAction);
    })
    expect(onClick).toHaveBeenCalled();
  });

  it("should render a workflow for every talk track workflow", () => {
    const workflows = ["workflowId1", "workflowId2", "workflowId3"];
    render(wrappedTalkTracks({ talkTrackWorkflows: workflows }));

    expect(screen.getByTestId(workflows[0])).not.toBeNull();
    expect(screen.getByTestId(workflows[1])).not.toBeNull();
    expect(screen.getByTestId(workflows[2])).not.toBeNull();
  });
});
