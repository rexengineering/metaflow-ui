import { INITIAL } from "../../constants/networkStates";
import { rexFlowActionTypes } from "../actions";

export const INITIAL_STATE = {
  workflows: {
    fetchState: INITIAL,
    message: "",
    available: [],
  },
  activeInteractionId: "",
  interactions: {},
};

const INITIAL_INTERACTION_STATE = {
  workflows: {
    fetchState: INITIAL,
    message: "",
    instantiated: [],
    activeWorkflowId: "",
  }
};

const rexFlowReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case rexFlowActionTypes.ADD_INTERACTION: {
      const { interactionIdentifier } = payload;
      return {
        ...state,
        interactions: {
          ...state.interactions,
          [interactionIdentifier]: INITIAL_INTERACTION_STATE,
        }
      }
    }
    case rexFlowActionTypes.SET_AVAILABLE_WORKFLOWS_FETCH_STATE: {
      return {
        ...state,
        workflows: {
          ...state.workflows,
          fetchState: payload,
        }
      }
    }
    case rexFlowActionTypes.SET_AVAILABLE_WORKFLOWS_MESSAGE: {
      return {
        ...state,
        workflows: {
          ...state.workflows,
          message: payload,
        }
      }
    }
    case rexFlowActionTypes.SET_AVAILABLE_WORKFLOWS: {
      return {
        ...state,
        workflows: {
          ...state.workflows,
          available: payload,
        }
      }
    }
    case rexFlowActionTypes.REMOVE_INTERACTION: {
      const { interactionIdentifier } = payload;
      const updatedInteractions = { ...state.interactions };
      delete updatedInteractions[interactionIdentifier];
      return {
        ...state,
        interactions: updatedInteractions,
      }
    }
    case rexFlowActionTypes.SET_ACTIVE_INTERACTION_ID: {
      return {
        ...state,
        activeInteractionId: payload
      }
    }
    case rexFlowActionTypes.SET_INSTANTIATED_WORKFLOW_FETCH_STATE: {
      const { interactionId, fetchState } = payload;
      const interactionState = state.interactions[interactionId];
      return {
        ...state,
        interactions: {
          ...state.interactions,
          [interactionId]: {
            ...interactionState,
            workflows: {
              ...interactionState.workflows,
              fetchState
            }
          }
        }
      }
    }
    case rexFlowActionTypes.SET_INSTANTIATED_WORKFLOW_MESSAGE: {
      const { interactionId, message } = payload;
      const interactionState = state.interactions[interactionId];
      return {
        ...state,
        interactions: {
          ...state.interactions,
          [interactionId]: {
            ...interactionState,
            workflows: {
              ...interactionState.workflows,
              message
            }
          }
        }
      }
    }
    case rexFlowActionTypes.ADD_INSTANTIATED_WORKFLOW: {
      const { interactionId, workflow } = payload;
      const interactionState = state.interactions[interactionId];
      const { workflows: { instantiated } } = interactionState;
      return {
        ...state,
        interactions: {
          ...state.interactions,
          [interactionId]: {
            ...interactionState,
            workflows: {
              ...interactionState.workflows,
              instantiated: [...instantiated, workflow],
            }
          }
        }
      }
    }
    default:
      return state;
  }
};

export default rexFlowReducer;
