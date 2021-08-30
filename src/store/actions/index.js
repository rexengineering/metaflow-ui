export const rexFlowActionTypes = {
  ADD_INTERACTION: "ADD_INTERACTION",
  REMOVE_INTERACTION: "REMOVE_INTERACTION",
};

export const addInteraction = (interactionIdentifier) => ({
  type: rexFlowActionTypes.ADD_INTERACTION,
  payload: { interactionIdentifier },
});

export const removeInteraction = (interactionIdentifier) => ({
  type: rexFlowActionTypes.REMOVE_INTERACTION,
  payload: { interactionIdentifier },
});
