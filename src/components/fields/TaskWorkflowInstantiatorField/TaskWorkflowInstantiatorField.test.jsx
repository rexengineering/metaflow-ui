import { render, screen } from "@testing-library/react";
import React from "react";
import TaskWorkflowInstantiator from "./TaskWorkflowInstantiatorField";
import {Provider} from "react-redux";
import getStore from "../../../store";

describe("<TaskWorkflowInstantiator />", () => {

    const workflowInstantiatorButtonProps = {
        label: "Buying",
        onClick: () => {},
        data: "buying-123",
    };

    const renderTaskWorkflowInstantiator = ( {label, onClick, data } = workflowInstantiatorButtonProps ) => (
        <Provider store={getStore({})}>
            <TaskWorkflowInstantiator data={data} label={label} onClick={onClick} />
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