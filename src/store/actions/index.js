export const rexFlowActionTypes = {
  ADD_INTERACTION: "ADD_INTERACTION",
  REMOVE_INTERACTION: "REMOVE_INTERACTION",

  SET_ACTIVE_INTERACTION_ID: "SET_ACTIVE_INTERACTION_ID",

  SET_AVAILABLE_WORKFLOWS_FETCH_STATE: "SET_AVAILABLE_WORKFLOWS_FETCH_STATE",
  SET_AVAILABLE_WORKFLOWS_MESSAGE: "SET_AVAILABLE_WORKFLOWS_MESSAGE",
  SET_AVAILABLE_WORKFLOWS: "SET_AVAILABLE_WORKFLOWS",
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
