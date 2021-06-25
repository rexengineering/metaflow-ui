import React from "react";
import { render, screen } from "@testing-library/react";
import TalkTrackItem from "./TalkTrackItem";

describe("<TalkTrackItem />", () => {
  const defaultProps = {
    title: "Intro",
    speech: "Some speech",
    actions: [],
    onSkip: () => {},
    onInquirySelected: () => {},
  };

  const renderTalkTrack = ({
    title,
    speech,
    actions,
    onSkip,
    onInquirySelected,
  } = defaultProps) => (
    <TalkTrackItem
      title={title}
      speech={speech}
      actions={actions}
      onSkip={onSkip}
      onInquirySelected={onInquirySelected}
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
    const actions = ["Action1", "Action2", "Action3"];
    render(renderTalkTrack({ ...defaultProps, actions }));
    actions.forEach((action) =>
      expect(screen.getByText(action)).toBeInTheDocument()
    );
  });
});
