import React from "react";
import { render, screen } from "@testing-library/react";
import TalkTrackItem from "./TalkTrackItem";

describe("<TalkTrackItem />", () => {
  const defaultProps = {
    identifier: "16515",
    title: "Intro",
    speech: "Some speech",
    actions: [],
    onSkip: () => {},
    onActionSelected: () => {},
    onContinue: () => {},
  };

  const renderTalkTrack = ({
    title,
    speech,
    actions,
    onSkip,
    onActionSelected,
    onContinue,
    identifier
  } = defaultProps) => (
    <TalkTrackItem
        identifier={identifier}
        speech={speech}
        title={title}
        onContinue={onContinue} onActionSelected={onActionSelected}
        onSkip={onSkip}
        actions={actions}
    />
  );

  it("should render", () => {
    const { asFragment } = render(renderTalkTrack());
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(renderTalkTrack());
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should render all passed actions", () => {
    const actions = [ {label: "Action1", talktrack_id: "action1"},  {label: "action2", talktrack_id: "action2"},  {label: "Action3", talktrack_id: "action3"}];
    render(renderTalkTrack({ ...defaultProps, actions }));
    actions.forEach(({label}) =>
      expect(screen.getByText(label)).toBeInTheDocument()
    );
  });
});
