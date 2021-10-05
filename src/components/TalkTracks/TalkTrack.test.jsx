import React from "react";
import { render } from "@testing-library/react";
import TalkTracks from "./TalkTracks";
import mockData from "./mockData";

describe("<TalkTrack />", () => {

    const defaultProps = {
        activeTalkTrackID: "buying-123",
        talkTrackItems: mockData,
        isATalkTrackBeingFetched: false,
    };

    const renderTalkTrackComponent = ({ activeTalkTrackID, talkTrackItems, isATalkTrackBeingFetched} = defaultProps) => (
        <TalkTracks
            isATalkTrackBeingFetched={isATalkTrackBeingFetched}
            talkTrackWorkflows={talkTrackItems}
            activeTalkTrackID={activeTalkTrackID}
        />
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
