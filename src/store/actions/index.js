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

export const initWorkflowLoading = (isLoading) => ({
  type: rexFlowActionTypes.INIT_WORKFLOW_IS_LOADING,
  payload: { isLoading },
});

export const fetchTasksSuccess = (task, workflowId) => ({
  type: rexFlowActionTypes.FETCH_TASKS_SUCCESS,
  payload: { task, workflowId },
});

export const fetchTasksFailure = (error) => ({
  type: rexFlowActionTypes.FETCH_TASKS_FAILURE,
  payload: { error },
});

export const setFetchTasksIsLoading = (isLoading) => ({
  type: rexFlowActionTypes.FETCH_TASKS_IS_LOADING,
  payload: { isLoading },
});

export const setSaveTaskDataIsLoading = (taskId, isLoading) => ({
  type: rexFlowActionTypes.SAVE_TASK_DATA_IS_LOADING,
  payload: { taskId, isLoading },
});

export const setIsTaskCompleted = (taskId, isTaskCompleted) => ({
  type: rexFlowActionTypes.IS_TASK_COMPLETED,
  payload: { taskId, isTaskCompleted },
});

export const saveTaskDataFailure = (taskId, errors) => ({
  type: rexFlowActionTypes.SAVE_TASK_DATA_FAILURE,
  payload: { taskId, errors },
});

export const saveTaskDataException = (taskId, errorMessage) => ({
  type: rexFlowActionTypes.SAVE_TASK_DATA_EXCEPTION,
  payload: { taskId, errorMessage },
});

export const setDeploymentId = (deployments) => ({
  type: rexFlowActionTypes.SET_DEPLOYMENT_ID,
  payload: { deployments },
});
