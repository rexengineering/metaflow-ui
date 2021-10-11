import React from "react";
import { render } from "@testing-library/react";
import TalkTrackPicker from "./";
import {Provider} from "react-redux";
import getStore from "../../store";

describe("<TalkTrackPicker />", () => {
    const renderTalkTrackPicker = () => (
        <Provider store={ getStore({ rexFlow: { buttons: { "Buying": null  } } }) }>
            <TalkTrackPicker
                availableTalkTracks={[{ name: "Buying", did: "165135" }]}
                onMenuItemSelected={() => {}}
                isDisabled={false} />
        </Provider>
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
