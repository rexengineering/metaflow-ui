import {
  setInstantiatedWorkflowFetchState,
  setInstantiatedWorkflowMessage,
  updateInstantiatedWorkflow,
  addNewInstantiatedWorkflow
} from "../actions";
import { startWorkflow } from "../queries";
import { apolloClient } from "./index";
import { FAILURE, REQUEST, SUCCESS } from "../../../constants/networkStates";
import { formatWorkflow } from "../../../utils/thunks";
import { v4 as generateUUID } from "uuid";

const instantiateWorkflow = async (dispatch, interactionId, did) => {
  const requestId = generateUUID();
  dispatch(addNewInstantiatedWorkflow(interactionId, requestId));

  try {

    dispatch(setInstantiatedWorkflowFetchState(interactionId, requestId, REQUEST));

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
            workflow
          }
        }
      }
    } = response;
    const formattedWorkflow = formatWorkflow(workflow);

    dispatch(setInstantiatedWorkflowFetchState(interactionId, requestId, SUCCESS));
    dispatch(updateInstantiatedWorkflow(interactionId, formattedWorkflow, requestId));

  } catch (error) {
    dispatch(setInstantiatedWorkflowFetchState(interactionId, requestId, FAILURE));
    dispatch(setInstantiatedWorkflowMessage(interactionId, error?.message ?? error, requestId));
  }

};

export default instantiateWorkflow;
