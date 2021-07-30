import { createSelector } from "reselect";

export const buildTaskIdentifier = ({ iid, tid }) => {
  if (!iid || !tid) {
    return "";
  }
  return `${iid}-${tid}`;
};

const rexFlowSelector = (state) => state.rexFlow;

export const selectIsWorkflowBeingInitialized = (deploymentID) =>
  createSelector(
    [rexFlowSelector],
    ({ isWorkflowBeingInitialized }) =>
      isWorkflowBeingInitialized[deploymentID] ?? false
  );

export const selectActiveWorkflows = createSelector(
  [rexFlowSelector],
  ({ activeWorkflows }) => activeWorkflows
);