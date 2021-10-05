import React from "react";
import { render } from "@testing-library/react";
import TalkTrackPicker from "./TalkTrackPicker";

describe("<TalkTrackPicker />", () => {
    const renderTalkTrackPicker = () => (
        <TalkTrackPicker
            availableTalkTracks={[{ name: "Buying", did: "165135" }]}
            onMenuItemSelected={() => {}}
            isDisabled={false} />
    );

    it("should render", () => {
        const { asFragment } = render(renderTalkTrackPicker());
        const initialRender = asFragment();

        expect(initialRender).not.toBeNull();
    });

    it("should match snapshot", () => {
        const { asFragment } = render(renderTalkTrackPicker());
        const initialRender = asFragment();

        expect(initialRender).toMatchSnapshot();
    });
});
