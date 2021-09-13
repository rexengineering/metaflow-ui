export const rexFlowActionTypes = {
  ADD_INTERACTION: "ADD_INTERACTION",
  REMOVE_INTERACTION: "REMOVE_INTERACTION",
  SET_ACTIVE_INTERACTION_ID: "SET_ACTIVE_INTERACTION_ID",

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

export const addInteraction = (interactionIdentifier) => ({
  type: rexFlowActionTypes.ADD_INTERACTION,
  payload: { interactionIdentifier },
});

export const removeInteraction = (interactionIdentifier) => ({
  type: rexFlowActionTypes.REMOVE_INTERACTION,
  payload: { interactionIdentifier },
});


export const setAvailableWorkflowsFetchState = (fetchState) => ({
  type: rexFlowActionTypes.SET_AVAILABLE_WORKFLOWS_FETCH_STATE,
  payload: fetchState,
});

export const setAvailableWorkflowsMessage = (message) => ({
  type: rexFlowActionTypes.SET_AVAILABLE_WORKFLOWS_MESSAGE,
  payload: message,
});

export const setAvailableWorkflows = (workflows) => ({
  type: rexFlowActionTypes.SET_AVAILABLE_WORKFLOWS,
  payload: workflows,
});


export const setActiveInteractionId = (interactionId) => ({
  type: rexFlowActionTypes.SET_ACTIVE_INTERACTION_ID,
  payload: interactionId,
});


export const setInstantiatedWorkflowFetchState = (interactionId, requestId, fetchState) => ({
  type: rexFlowActionTypes.SET_INSTANTIATED_WORKFLOW_FETCH_STATE,
  payload: {
    interactionId,
    requestId,
    fetchState
  },
});

export const addNewInstantiatedWorkflow = (interactionId, requestId) => ({
  type: rexFlowActionTypes.ADD_NEW_INSTANTIATED_WORKFLOW,
  payload: {
    interactionId,
    requestId
  },
});

export const setInstantiatedWorkflowMessage = (interactionId, message, requestId) => ({
  type: rexFlowActionTypes.SET_INSTANTIATED_WORKFLOW_MESSAGE,
  payload: {
    interactionId,
    message,
    requestId
  },
});

export const updateInstantiatedWorkflow = (interactionId, workflow, requestId) => ({
  type: rexFlowActionTypes.UPDATE_INSTANTIATED_WORKFLOW,
  payload: {
    interactionId,
    workflow,
    requestId
  },
});

export const removeInstantiatedWorkflow = (interactionId, workflowIid) => ({
  type: rexFlowActionTypes.REMOVE_INSTANTIATED_WORKFLOW,
  payload: {
    interactionId,
    workflowIid
  },
});

export const addTask = (interactionId, workflowIid, task) => ({
  type: rexFlowActionTypes.ADD_TASK,
  payload: {
    interactionId,
    workflowIid,
    task
  },
});

export const removeTask = (interactionId, workflowIid, taskId) => ({
  type: rexFlowActionTypes.REMOVE_TASK,
  payload: {
    interactionId,
    workflowIid,
    taskId
  },
});

export const updateTask = (interactionId, workflowIid, taskId, updatedTask) => ({
  type: rexFlowActionTypes.UPDATE_TASK,
  payload: {
    interactionId,
    workflowIid,
    taskId,
    updatedTask
  },
});