import { render, screen } from "@testing-library/react";
import React from "react";
import CallerInfo from "./Callerinfo";
import {Provider} from "react-redux";
import getStore from "../../store";


describe("<CallerInfo />", () => {

    const renderCallerInfo = (callerName = "John Doe", deploymentID = "deployment-865") => (
        <Provider store={getStore({})}>
            <CallerInfo callerName={callerName} workflowName={deploymentID}/>
        </Provider>
    );

    it("should render", () => {
        const { asFragment } = render(renderCallerInfo());
        const initialRender = asFragment();

        expect(initialRender).not.toBeNull();
    });

    it("should match snapshot", () => {
        const { asFragment } = render(renderCallerInfo());
        const initialRender = asFragment();

        expect(initialRender).toMatchSnapshot();
    });

    it("should display caller name properly", () => {
        const callerName = "Gabriel";
        render(renderCallerInfo(callerName));
        expect(screen.getByText(callerName)).toBeInTheDocument();
    });
});
