import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import WorkflowInstantiatorButton from "./WorkflowInstantiatorButton";
import {Provider} from "react-redux";
import getStore from "../../store";

describe("<WorkflowInstantiatorButton />", () => {

    const workflowInstantiatorButtonProps = {
        label: "Buying",
        onClick: () => {},
        workflowIdentifier: "buying-123"
    };

    const renderWorkflowInstantiatorButton = ( {label, onClick, workflowIdentifier } = workflowInstantiatorButtonProps ) => (
        <Provider store={getStore({})}>
            <WorkflowInstantiatorButton label={label} onClick={onClick} workflowIdentifier={workflowIdentifier} />
        </Provider>
    );

    it("should render", () => {
        const { asFragment } = render(renderWorkflowInstantiatorButton());
        const initialRender = asFragment();

        expect(initialRender).not.toBeNull();
    });

    it("should match snapshot", () => {
        const { asFragment } = render(renderWorkflowInstantiatorButton());
        const initialRender = asFragment();

        expect(initialRender).toMatchSnapshot();
    });

    it("should render a provided label", () => {
        const customLabel = "Selling";
        render(renderWorkflowInstantiatorButton({...workflowInstantiatorButtonProps, label: customLabel}));
        const element = screen.getByText(customLabel);

        expect(element).toBeInTheDocument();
    });

    it("should handle onClick event", () => {
        const customOnClick = jest.fn();
        render(renderWorkflowInstantiatorButton({...workflowInstantiatorButtonProps, onClick: customOnClick}));
        const button = screen.getByRole("button");
        fireEvent.click(button);
        expect(customOnClick).toBeCalled();
    });
});