import React from "react";
import {Chip, CircularProgress, makeStyles} from "@material-ui/core";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {startWorkflowByName} from "../../../store/thunks/thunks";
import isTalkTrackDidInitialized from "../../../utils/talkTracks";
import {InitialButtonState, LoadingButtonState} from "../../../constants";

const useStyles = makeStyles(({ spacing }) => ({
    chip: {
        float: "left",
        marginRight: spacing(1),
        lineHeight: 1,
    }
}))

function TaskWorkflowInstantiatorField({onClick, data: workflowName, activeWorkflows, isInitialized, isFlexTaskActive, label, startWorkflowByName, buttonState, ...props}){
    const classes = useStyles();
    const initializeWorkflow = () => {
        if (!workflowName || isInitialized || !isFlexTaskActive)
            return
        startWorkflowByName(workflowName);
        onClick();
    };
    const isLoading = buttonState === LoadingButtonState;

    return (
        <Chip
            avatar={ isLoading
                            ? (<CircularProgress size={12} />)
                            : null
            }
            disabled={ isInitialized || !isFlexTaskActive || isLoading }
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

const mapStateToProps = ({ rexFlow: { activeWorkflows, isFlexTaskActive, buttons } }, { data: workflowName }) => ({
    activeWorkflows,
    isFlexTaskActive,
    isInitialized: isTalkTrackDidInitialized(activeWorkflows, workflowName, true),
    buttonState: buttons[workflowName] ?? InitialButtonState,
});

const mapDispatchToProps = (dispatch) => ({
    startWorkflowByName: (workflowName) => startWorkflowByName(dispatch, workflowName)
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskWorkflowInstantiatorField);