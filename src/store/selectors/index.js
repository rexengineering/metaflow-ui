import { createSelector } from "reselect";

export const buildTaskIdentifier = ({ iid, tid }) => {
  if (!iid || !tid) {
    return "";
  }
  return `${iid}-${tid}`;
};

const rexFlowSelector = (state) => state.rexFlow;

const instanceSelector = (instanceID) => createSelector(
    [rexFlowSelector],
    ({instances}) => instances[instanceID] ?? {}
);

export const selectTasks = (instanceID) =>
    createSelector(
  [instanceSelector(instanceID)],
  ({ tasks }) => tasks
    );

export const selectIsWorkflowBeingInitialized = (deploymentID, instanceID) =>
  createSelector(
    [instanceSelector(instanceID)],
    ({ isWorkflowBeingInitialized }) =>
      isWorkflowBeingInitialized[deploymentID] ?? false
  );

export const selectActiveWorkflows = createSelector(
  [rexFlowSelector],
  ({ activeWorkflows }) => activeWorkflows
);

export const selectIsTaskBeingProcessed = (task, instanceID) =>
  createSelector(
    [instanceSelector(instanceID)],
    ({ tasksState }) =>
      tasksState[buildTaskIdentifier(task)]?.isLoading ?? false
  );

export const selectIsTaskCompleted = (task, instanceID) =>
  createSelector(
    [instanceSelector(instanceID)],
    ({ tasksState }) =>
      tasksState[buildTaskIdentifier(task)]?.isTaskCompleted ?? false
  );

export const selectTask = (workflowID, instanceID) =>
    createSelector(selectTasks(instanceID), (tasks) => {
      if (!tasks) return {};
      return tasks[workflowID] ?? {};
    });

export const selectDeployments = createSelector(
  [rexFlowSelector],
  ({ deployments }) => deployments
);

export const selectValidationErrors = (task, instanceID) =>
  createSelector(
    [instanceSelector(instanceID)],
    ({ tasksState }) => tasksState[buildTaskIdentifier(task)]?.errors ?? null
  );

export const selectExceptionError = (task, instanceID) =>
  createSelector(
    [instanceSelector(instanceID)],
    ({ tasksState }) =>
      tasksState[buildTaskIdentifier(task)]?.exceptionError ?? null
  );
