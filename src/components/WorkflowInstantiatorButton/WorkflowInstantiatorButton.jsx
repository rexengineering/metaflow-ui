import React from "react";
import { Chip } from "@material-ui/core";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { initWorkflow } from "../../store/thunks/thunks";

function WorkflowInstantiatorButton({onClick, workflowIdentifier, label, ...props}){
    const dispatch = useDispatch();
    const initializeWorkflow = () => {
        dispatch(initWorkflow(workflowIdentifier));
        onClick();
    }
    return (
        <Chip
            onClick={initializeWorkflow}
            label={label}
            {...props}
        />
    )
}


WorkflowInstantiatorButton.defaultProps = {
    onClick: () => {},
};

WorkflowInstantiatorButton.propTypes = {
    onClick: PropTypes.func,
    label: PropTypes.string.isRequired,
    workflowIdentifier: PropTypes.string.isRequired,
};

export default WorkflowInstantiatorButton;