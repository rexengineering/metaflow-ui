export const rexFlowActionTypes = {
  ADD_INTERACTION: "ADD_INTERACTION",
  REMOVE_INTERACTION: "REMOVE_INTERACTION",

  SET_ACTIVE_INTERACTION_ID: "SET_ACTIVE_INTERACTION_ID",

  SET_AVAILABLE_WORKFLOWS_FETCH_STATE: "SET_AVAILABLE_WORKFLOWS_FETCH_STATE",
  SET_AVAILABLE_WORKFLOWS_MESSAGE: "SET_AVAILABLE_WORKFLOWS_MESSAGE",
  SET_AVAILABLE_WORKFLOWS: "SET_AVAILABLE_WORKFLOWS",

  SET_INSTANTIATED_WORKFLOW_FETCH_STATE: "SET_INSTANTIATED_WORKFLOW_FETCH_STATE",
  SET_INSTANTIATED_WORKFLOW_MESSAGE: "SET_INSTANTIATED_WORKFLOW_MESSAGE",
  ADD_INSTANTIATED_WORKFLOW: "ADD_INSTANTIATED_WORKFLOW",
  REMOVE_INSTANTIATED_WORKFLOW: "REMOVE_INSTANTIATED_WORKFLOW",
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


export const setInstantiatedWorkflowFetchState = (interactionId, fetchState) => ({
  type: rexFlowActionTypes.SET_INSTANTIATED_WORKFLOW_FETCH_STATE,
  payload: {
    interactionId,
    fetchState
  },
});

export const setInstantiatedWorkflowMessage = (interactionId, message) => ({
  type: rexFlowActionTypes.SET_INSTANTIATED_WORKFLOW_MESSAGE,
  payload: {
    interactionId,
    message
  },
});

export const addInstantiatedWorkflow = (interactionId, workflow) => ({
  type: rexFlowActionTypes.ADD_INSTANTIATED_WORKFLOW,
  payload: {
    interactionId,
    workflow
  },
});