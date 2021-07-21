import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { initWorkflow } from "../../store/thunks/thunks";
import ActionButton from "../ActionButton";
import { selectIsWorkflowBeingInitialized } from "../../store/selectors";

function WorkflowInstantiator({ deploymentID, instanceID }) {
  const isWorkflowBeingInitialized = useSelector(
    selectIsWorkflowBeingInitialized(deploymentID, instanceID)
  );
  const dispatch = useDispatch();
  const handleStartWorkflow = () => dispatch(initWorkflow(deploymentID, instanceID));

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
  instanceID: PropTypes.string.isRequired,
};

export default WorkflowInstantiator;
