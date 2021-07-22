import React from "react";
import {Chip, makeStyles} from "@material-ui/core";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { initWorkflow } from "../../store/thunks/thunks";

const useStyles = makeStyles(({ spacing }) => ({
    chip: {
        float: "left",
        marginRight: spacing(1),
    }
}))

function WorkflowInstantiatorButton({onClick, deploymentID, label, ...props}){
    const classes = useStyles();
    const dispatch = useDispatch();
    const initializeWorkflow = () => {
        dispatch(initWorkflow(deploymentID));
        onClick();
    }
    return (
        <Chip
            className={classes.chip}
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
    deploymentID: PropTypes.string.isRequired,
};

export default WorkflowInstantiatorButton;