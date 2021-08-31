import { setInstantiatedWorkflowFetchState, setInstantiatedWorkflowMessage, addInstantiatedWorkflow } from "../actions";
import { startWorkflow } from "../queries";
import { apolloClient } from "./";
import { FAILURE, REQUEST, SUCCESS } from "../../constants/networkStates";

const formatWorkflows = (workflows) => workflows.map(({ iid, metadata, name, did }) => {
    const workflow = { iid, name, did };
    if (!Array.isArray(metadata))
      return workflow;
    const formattedMetadata = metadata.reduce((previousMetadata, currentMetadata) => {
      const { key, value } = currentMetadata;
      return {
        ...previousMetadata,
        [key]: value
      }
    }, {});
    return {
      ...workflow,
      metadata: formattedMetadata,
    }
})

const instantiateWorkflow = (interactionId, did) => async (dispatch, getState) => {

  const { rexFlow: { interactions } } = getState();
  if (!interactionId || !did || !interactions[interactionId]){
    return;
  }


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
            workflow
          }
        }
      }
    } = response;
    const [ formattedWorkflow ] = formatWorkflows([workflow]);

    dispatch(setInstantiatedWorkflowFetchState(interactionId, SUCCESS));
    dispatch(addInstantiatedWorkflow(interactionId, formattedWorkflow));

  } catch (error) {
    dispatch(setInstantiatedWorkflowFetchState(interactionId, FAILURE));
    dispatch(setInstantiatedWorkflowMessage(interactionId, error?.message ?? error));
  }
};

export default instantiateWorkflow;
