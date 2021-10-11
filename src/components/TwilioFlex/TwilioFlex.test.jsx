import { render } from "@testing-library/react";
import React from "react";
import TwilioFlex from "./TwilioFlex";

describe("<TwilioFlex />", () => {
    const renderTwilioFlex = (url = "https://flex.twilio.com/agent-desktop/") => (
        <TwilioFlex twilioFlexURL={url} />
    );

    it("should render", () => {
        const { asFragment } = render(renderTwilioFlex());
        const initialRender = asFragment();

        expect(initialRender).not.toBeNull();
    });

    it("should match snapshot", () => {
        const { asFragment } = render(renderTwilioFlex());
        const initialRender = asFragment();

        expect(initialRender).toMatchSnapshot();
    });

    it("should render an iframe", () => {
        render(renderTwilioFlex());
        const iframe = document.querySelector('iframe');
        expect(iframe).toBeInTheDocument();
    });
});
