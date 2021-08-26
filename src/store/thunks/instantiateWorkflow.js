import { setInstantiatedWorkflowFetchState, setInstantiatedWorkflowMessage, addInstantiatedWorkflow } from "../actions";
import { startWorkflow } from "../queries";
import { apolloClient } from "./thunks";
import { FAILURE, REQUEST, SUCCESS } from "../../constants/networkStates";

const instantiateWorkflow = (dispatch) => async (interactionId, did) => {
  try {
    dispatch(setInstantiatedWorkflowFetchState(interactionId, REQUEST));

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
            workflow: { iid, name }
          }
        }
      }
    } = response;
    const workflow = { iid, did, name };

    dispatch(setInstantiatedWorkflowFetchState(interactionId, SUCCESS));
    dispatch(addInstantiatedWorkflow(interactionId, workflow));
  } catch (error) {
    dispatch(setInstantiatedWorkflowFetchState(interactionId, FAILURE));
    dispatch(setInstantiatedWorkflowMessage(interactionId, error?.message ?? error));
  }
};

export default instantiateWorkflow;
