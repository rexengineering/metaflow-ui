import React from "react";
import {Chip, makeStyles} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {startWorkflowByName} from "../../../store/thunks/thunks";
import {selectActiveWorkflows, selectIsFlexTaskActive} from "../../../store/selectors/rexflow";
import isTalkTrackDidInitialized from "../../../utils/talkTracks";

const useStyles = makeStyles(({ spacing }) => ({
    chip: {
        float: "left",
        marginRight: spacing(1),
    }
}))

function TaskWorkflowInstantiator({onClick, data: workflowName, label, ...props}){
    const classes = useStyles();
    const dispatch = useDispatch();
    const activeWorkflows = useSelector(selectActiveWorkflows);
    const isInitialized =  isTalkTrackDidInitialized(activeWorkflows, workflowName);
    const isFlexTaskActive = useSelector(selectIsFlexTaskActive);

    const initializeWorkflow = () => {
        if (!workflowName || isInitialized || !isFlexTaskActive)
            return
        dispatch(startWorkflowByName(workflowName));
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


TaskWorkflowInstantiator.defaultProps = {
    onClick: () => {},
};

TaskWorkflowInstantiator.propTypes = {
    onClick: PropTypes.func,
    label: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired,
};

export default TaskWorkflowInstantiator;