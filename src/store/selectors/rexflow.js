import { createSelector } from "reselect";

export const buildTaskIdentifier = ({ iid, tid }) => {
  if (!iid || !tid) {
    return "";
  }
  return `${iid}-${tid}`;
};

const rexFlowSelector = (state) => state.rexFlow;

export const selectTasks = createSelector(
  [rexFlowSelector],
  ({ tasks }) => tasks
);

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

export const selectIsTaskBeingProcessed = (task) =>
  createSelector(
    [rexFlowSelector],
    ({ tasksState }) =>
      tasksState[buildTaskIdentifier(task)]?.isLoading ?? false
  );

export const selectIsTaskCompleted = (task) =>
  createSelector(
    [rexFlowSelector],
    ({ tasksState }) =>
      tasksState[buildTaskIdentifier(task)]?.isTaskCompleted ?? false
  );

export const selectDeployments = createSelector(
  [rexFlowSelector],
  ({ deployments }) => deployments
);

export const selectValidationErrors = (task) =>
  createSelector(
    [rexFlowSelector],
    ({ tasksState }) => tasksState[buildTaskIdentifier(task)]?.errors ?? null
  );

export const selectExceptionError = (task) =>
  createSelector(
    [rexFlowSelector],
    ({ tasksState }) =>
      tasksState[buildTaskIdentifier(task)]?.exceptionError ?? null
  );

export const selectWorkflowID = (workflowName) => createSelector(
    [selectActiveWorkflows],
    (activeWorkflows) => {
      if (!Array.isArray(activeWorkflows)) return "";
      return activeWorkflows.find((activeWorkflow) => activeWorkflow.includes(workflowName));
    }
);