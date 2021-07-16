import React from "react";
import { render } from "@testing-library/react";
import TalkTrack from "./TalkTrack";
import mockData from "./mockData";

describe("<TalkTrack />", () => {

    const defaultProps = {
        activeTalkTrackID: "buying-123",
        onContinue: () => {},
        onTabChange: () => {},
        onActionSelected: () => {},
        onSkip: () => {},
        talkTrackItems: mockData,
    };

    const renderTalkTrackComponent = ({ activeTalkTrackID, onContinue, onTabChange, onActionSelected, onSkip, talkTrackItems} = defaultProps) => (
        <TalkTrack activeTalkTrackID={activeTalkTrackID}
                   onContinue={onContinue}
                   onTabChange={onTabChange}
                   onActionSelected={onActionSelected}
                   onSkip={onSkip}
                   talkTrackItems={talkTrackItems} />
    );

    it("should render", () => {
        const { asFragment } = render(renderTalkTrackComponent());
        const initialRender = asFragment();

        expect(initialRender).not.toBeNull();
    });

    it("should match snapshot", () => {
        const { asFragment } = render(renderTalkTrackComponent());
        const initialRender = asFragment();

        expect(initialRender).toMatchSnapshot();
    });

});
