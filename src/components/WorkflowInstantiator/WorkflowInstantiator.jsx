import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { initWorkflow } from "../../store/thunks/thunks";
import ActionButton from "../ActionButton";
import { selectIsWorkflowBeingInitialized } from "../../store/selectors/rexflow";

function WorkflowInstantiator({ deploymentID }) {
  const isWorkflowBeingInitialized = useSelector(
    selectIsWorkflowBeingInitialized(deploymentID)
  );
  const dispatch = useDispatch();
  const handleStartWorkflow = () => dispatch(initWorkflow(deploymentID));

  return (
    <ActionButton
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
