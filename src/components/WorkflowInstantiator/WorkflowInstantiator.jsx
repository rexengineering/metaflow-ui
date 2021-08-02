import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { initWorkflow } from "../../store/thunks/thunks";
import ActionButton from "../ActionButton";

function WorkflowInstantiator({ deploymentID, isWorkflowBeingInitialized, dispatch }) {
  const handleStartWorkflow = () => dispatch(initWorkflow(deploymentID));

  return (
    <ActionButton
      onClick={handleStartWorkflow}
      isLoading={!!(isWorkflowBeingInitialized || !deploymentID)}
    >
      Start workflow
    </ActionButton>
  );
}

WorkflowInstantiator.propTypes = {
  deploymentID: PropTypes.string.isRequired,
};

const mapStateToProps = ({ rexFlow: { isWorkflowBeingInitialized } }, { deploymentID }) => ({
  isWorkflowBeingInitialized: isWorkflowBeingInitialized[deploymentID] ?? false
});

export default connect(mapStateToProps)(WorkflowInstantiator);
