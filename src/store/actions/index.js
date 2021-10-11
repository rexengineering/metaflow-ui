export const rexFlowActionTypes = {
  SET_AVAILABLE_WORKFLOWS_FETCH_STATE: "SET_AVAILABLE_WORKFLOWS_FETCH_STATE",
  SET_AVAILABLE_WORKFLOWS_MESSAGE: "SET_AVAILABLE_WORKFLOWS_MESSAGE",
  SET_AVAILABLE_WORKFLOWS: "SET_AVAILABLE_WORKFLOWS",

  SET_INSTANTIATED_WORKFLOW_FETCH_STATE: "SET_INSTANTIATED_WORKFLOW_FETCH_STATE",
  ADD_NEW_INSTANTIATED_WORKFLOW: "ADD_NEW_INSTANTIATED_WORKFLOW",
  SET_INSTANTIATED_WORKFLOW_MESSAGE: "SET_INSTANTIATED_WORKFLOW_MESSAGE",
  UPDATE_INSTANTIATED_WORKFLOW: "UPDATE_INSTANTIATED_WORKFLOW",
  REMOVE_INSTANTIATED_WORKFLOW: "REMOVE_INSTANTIATED_WORKFLOW",

  ADD_TASK: "ADD_TASK",
  REMOVE_TASK: "REMOVE_TASK",
  UPDATE_TASK: "UPDATE_TASK",
};

export const setAvailableWorkflowsFetchState = (fetchState) => ({
  type: rexFlowActionTypes.SET_AVAILABLE_WORKFLOWS_FETCH_STATE,
  payload: { fetchState },
});

export const setAvailableWorkflowsMessage = (message) => ({
  type: rexFlowActionTypes.SET_AVAILABLE_WORKFLOWS_MESSAGE,
  payload: { message },
});

export const setAvailableWorkflows = (workflows) => ({
  type: rexFlowActionTypes.SET_AVAILABLE_WORKFLOWS,
  payload: { workflows },
});

export const setInstantiatedWorkflowFetchState = (requestId, fetchState) => ({
  type: rexFlowActionTypes.SET_INSTANTIATED_WORKFLOW_FETCH_STATE,
  payload: {
    requestId,
    fetchState
  },
});

export const addNewInstantiatedWorkflow = (workflow) => ({
  type: rexFlowActionTypes.ADD_NEW_INSTANTIATED_WORKFLOW,
  payload: {
    workflow,
  },
});

export const setInstantiatedWorkflowMessage = (message, requestId) => ({
  type: rexFlowActionTypes.SET_INSTANTIATED_WORKFLOW_MESSAGE,
  payload: {
    message,
    requestId
  },
});

export const updateInstantiatedWorkflow = (workflow, workflowIdentifier,  searchBy) => ({
  type: rexFlowActionTypes.UPDATE_INSTANTIATED_WORKFLOW,
  payload: {
    workflow,
    workflowIdentifier,
    searchBy
  },
});

export const removeInstantiatedWorkflow = (iid) => ({
  type: rexFlowActionTypes.REMOVE_INSTANTIATED_WORKFLOW,
  payload: {
    iid
  },
});

export const addTask = (workflowIid, task) => ({
  type: rexFlowActionTypes.ADD_TASK,
  payload: {
    workflowIid,
    task
  },
});

export const removeTask = (workflowIid, taskId) => ({
  type: rexFlowActionTypes.REMOVE_TASK,
  payload: {
    workflowIid,
    taskId
  },
});

export const updateTask = (workflowIid, taskId, updatedTask) => ({
  type: rexFlowActionTypes.UPDATE_TASK,
  payload: {
    workflowIid,
    taskId,
    updatedTask
  },
});