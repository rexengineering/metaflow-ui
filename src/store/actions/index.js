export const rexFlowActionTypes = {
  INIT_WORKFLOW_SUCCESSFUL: "INIT_WORKFLOW_SUCCESSFUL",
  INIT_WORKFLOW_FAILURE: "INIT_WORKFLOW_FAILURE",
  INIT_WORKFLOW_IS_LOADING: "INIT_WORKFLOW_IS_LOADING",
  FETCH_TASKS_SUCCESS: "FETCH_TASKS_SUCCESS",
  FETCH_TASKS_FAILURE: "FETCH_TASKS_FAILURE",
  FETCH_TASKS_IS_LOADING: "FETCH_TASKS_IS_LOADING",
  SAVE_TASK_DATA_IS_LOADING: "SAVE_TASK_DATA_IS_LOADING",
  SAVE_TASK_DATA_SUCCESS: "SAVE_TASK_DATA_SUCCESS",
  SAVE_TASK_DATA_FAILURE: "SAVE_TASK_DATA_FAILURE",
  SAVE_TASK_DATA_EXCEPTION: "SAVE_TASK_DATA_EXCEPTION",
  IS_TASK_COMPLETED: "IS_TASK_COMPLETED",
  SET_DEPLOYMENT_ID: "SET_DEPLOYMENT_ID",
};

export const initWorkflowSuccessful = (workflows) => ({
  type: rexFlowActionTypes.INIT_WORKFLOW_SUCCESSFUL,
  payload: { workflows },
});

export const initWorkflowFailure = (error) => ({
  type: rexFlowActionTypes.INIT_WORKFLOW_FAILURE,
  payload: { error },
});

export const initWorkflowLoading = (isLoading, instanceID, deploymentID) => ({
  type: rexFlowActionTypes.INIT_WORKFLOW_IS_LOADING,
  payload: { isLoading, deploymentID, instanceID },
});

export const fetchTasksSuccess = (task, workflowId, instanceID) => ({
  type: rexFlowActionTypes.FETCH_TASKS_SUCCESS,
  payload: { task, workflowId, instanceID },
});

export const fetchTasksFailure = (error) => ({
  type: rexFlowActionTypes.FETCH_TASKS_FAILURE,
  payload: { error },
});

export const setFetchTasksIsLoading = (isLoading, instanceID) => ({
  type: rexFlowActionTypes.FETCH_TASKS_IS_LOADING,
  payload: { isLoading, instanceID },
});

export const setSaveTaskDataIsLoading = (taskId, isLoading, instanceID) => ({
  type: rexFlowActionTypes.SAVE_TASK_DATA_IS_LOADING,
  payload: { taskId, isLoading, instanceID },
});

export const setIsTaskCompleted = (taskId, isTaskCompleted, instanceID) => ({
  type: rexFlowActionTypes.IS_TASK_COMPLETED,
  payload: { taskId, isTaskCompleted, instanceID },
});

export const saveTaskDataFailure = (taskId, errors, instanceID) => ({
  type: rexFlowActionTypes.SAVE_TASK_DATA_FAILURE,
  payload: { taskId, errors, instanceID },
});

export const saveTaskDataException = (taskId, errorMessage, instanceID) => ({
  type: rexFlowActionTypes.SAVE_TASK_DATA_EXCEPTION,
  payload: { taskId, errorMessage, instanceID },
});

export const setDeploymentId = (deployments) => ({
  type: rexFlowActionTypes.SET_DEPLOYMENT_ID,
  payload: { deployments },
});
