import {
  setInstantiatedWorkflowFetchState,
  setInstantiatedWorkflowMessage,
  updateInstantiatedWorkflow,
  addNewInstantiatedWorkflow
} from "../actions";
import { startWorkflow } from "../queries";
import { apolloClient } from "./";
import { FAILURE, REQUEST, SUCCESS } from "../../constants/networkStates";
import { v4 as generateUUID } from "uuid";

const instantiateWorkflow = (did) => async (dispatch) => {

  const requestId = generateUUID();
  dispatch(addNewInstantiatedWorkflow( { requestId, did } ));

  try {

    dispatch(setInstantiatedWorkflowFetchState(requestId, REQUEST));

    const response = await apolloClient.mutate({
      mutation: startWorkflow,
      variables: {
        startWorkflowInput: {
          did,
        },
      },
    });

    const {
      data: {
        workflow: {
          start: {
            workflow: { iid }
          }
        }
      }
    } = response;

    dispatch(setInstantiatedWorkflowFetchState(requestId, SUCCESS));
    dispatch(updateInstantiatedWorkflow( { iid }, requestId, 'requestId' ));

  } catch (error) {
    dispatch(setInstantiatedWorkflowFetchState(requestId, FAILURE));
    dispatch(setInstantiatedWorkflowMessage(error?.message ?? error, requestId));
  }

};

export default instantiateWorkflow;
