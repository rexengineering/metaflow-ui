import { apolloClient } from "./thunks";
import {
  setAvailableWorkflows,
  setAvailableWorkflowsFetchState,
  setAvailableWorkflowsMessage,
} from "../actions";
import { getAvailableDeployments } from "../queries";
import { FAILURE, REQUEST, SUCCESS } from "../../constants/networkStates";
import { INITIAL_STATE } from "../reducers/rexflow";

const fetchAvailableWorkflows = () => async (dispatch) => {
  try {
    dispatch(setAvailableWorkflowsFetchState(REQUEST));

    const response = await apolloClient.query({
      query: getAvailableDeployments,
    });
    const receivedDeployments = response?.data?.workflows?.available;
    const availableWorkflows = Array.isArray(receivedDeployments)
      ? receivedDeployments
      : [];

    dispatch(setAvailableWorkflowsFetchState(SUCCESS));
    dispatch(setAvailableWorkflows(availableWorkflows));
  } catch (error) {
    dispatch(setAvailableWorkflowsFetchState(FAILURE));
    dispatch(setAvailableWorkflowsMessage(error?.message ?? error));
    dispatch(setAvailableWorkflows(INITIAL_STATE.workflows.available));
  }
};

export default fetchAvailableWorkflows;
