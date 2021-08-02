import React from "react";
import {Chip, makeStyles} from "@material-ui/core";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {startWorkflowByName} from "../../../store/thunks/thunks";
import isTalkTrackDidInitialized from "../../../utils/talkTracks";

const useStyles = makeStyles(({ spacing }) => ({
    chip: {
        float: "left",
        marginRight: spacing(1),
    }
}))

function TaskWorkflowInstantiatorField({onClick, data: workflowName, activeWorkflows, isInitialized, isFlexTaskActive, label, startWorkflowByName, ...props}){
    const classes = useStyles();
    const initializeWorkflow = () => {
        if (!workflowName || isInitialized || !isFlexTaskActive)
            return
        startWorkflowByName(workflowName);
        onClick();
    };

    return (
        <Chip
            disabled={isInitialized || !isFlexTaskActive}
            className={classes.chip}
            onClick={initializeWorkflow}
            label={label}
            {...props}
        />
    )
}


TaskWorkflowInstantiatorField.defaultProps = {
    onClick: () => {},
};

TaskWorkflowInstantiatorField.propTypes = {
    onClick: PropTypes.func,
    label: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired,
};

const mapStateToProps = ({ rexFlow: { activeWorkflows, isFlexTaskActive } }, { data: workflowName }) => ({
    activeWorkflows,
    isFlexTaskActive,
    isInitialized: isTalkTrackDidInitialized(activeWorkflows, workflowName)
});

const mapDispatchToProps = (dispatch) => ({
    startWorkflowByName: (workflowName) => startWorkflowByName(dispatch, workflowName)
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskWorkflowInstantiatorField);