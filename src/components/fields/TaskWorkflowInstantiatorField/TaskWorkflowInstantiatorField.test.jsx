import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import TaskWorkflowInstantiator from "./TaskWorkflowInstantiatorField";
import {Provider} from "react-redux";
import getStore from "../../../store";

describe("<TaskWorkflowInstantiator />", () => {

    const workflowInstantiatorButtonProps = {
        label: "Buying",
        onClick: () => {},
        workflowIdentifier: "buying-123",
        data: "some data",
    };

    const renderTaskWorkflowInstantiator = ( {label, onClick, workflowIdentifier, data } = workflowInstantiatorButtonProps ) => (
        <Provider store={getStore({})}>
            <TaskWorkflowInstantiator data={data} label={label} onClick={onClick} workflowIdentifier={workflowIdentifier} />
        </Provider>
    );

    it("should render", () => {
        const { asFragment } = render(renderTaskWorkflowInstantiator());
        const initialRender = asFragment();

        expect(initialRender).not.toBeNull();
    });

    it("should match snapshot", () => {
        const { asFragment } = render(renderTaskWorkflowInstantiator());
        const initialRender = asFragment();

        expect(initialRender).toMatchSnapshot();
    });

    it("should render a provided label", () => {
        const customLabel = "Selling";
        render(renderTaskWorkflowInstantiator({...workflowInstantiatorButtonProps, label: customLabel}));
        const element = screen.getByText(customLabel);

        expect(element).toBeInTheDocument();
    });
});