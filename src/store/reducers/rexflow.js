import { INITIAL } from "../../constants/networkStates";
import { rexFlowActionTypes } from "../actions";

const INITIAL_STATE = {
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
    case rexFlowActionTypes.REMOVE_INTERACTION: {
      const { interactionIdentifier } = payload;
      const updatedInteractions = { ...state.interactions };
      delete updatedInteractions[interactionIdentifier];
      return {
        ...state,
        interactions: updatedInteractions,
      }
    }
    default:
      return state;
  }
};

export default rexFlowReducer;
