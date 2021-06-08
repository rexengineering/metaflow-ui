import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { initWorkflow } from "../../store/thunks";
import ActionButton from "../ActionButton";
import { selectIsWorkflowBeingInitialized } from "../../store/selectors";

const useStyles = makeStyles(() => ({
  startButton: {
    display: "block",
    margin: "0 auto",
  },
}));
function WorkflowInstantiator({ deploymentID }) {
  const isWorkflowBeingInitialized = useSelector(
    selectIsWorkflowBeingInitialized(deploymentID)
  );
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleStartWorkflow = () => dispatch(initWorkflow(deploymentID));

  return (
    <ActionButton
      className={classes.startButton}
      onClick={handleStartWorkflow}
      isLoading={Boolean(isWorkflowBeingInitialized || !deploymentID)}
    >
      Start workflow
    </ActionButton>
  );
}

WorkflowInstantiator.propTypes = {
  deploymentID: PropTypes.string.isRequired,
};

export default WorkflowInstantiator;
