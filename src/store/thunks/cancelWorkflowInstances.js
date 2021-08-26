import { cancelAllWorkflows } from "../queries";
import { deleteWorkflows } from "../actions";
import { apolloClient } from "./thunks";

export const cancelInteractionWorkflowInstances = (instanceId) => async (dispatch, getState) => {
  try {
    const workflows = getState().interactions[instanceId].workflows.instantiated
    const workflowIds = workflows.map((workflow) => workflow.iid);
    const {
      data: {
        workflow: {
            cancel: { iid: canceledWorkflowsIds }
          }
      }
    } = await apolloClient.mutate({
      mutation: cancelAllWorkflows,
      variables: {
        cancelWorkflowInput: {
          iid: workflowIds,
        },
      },
    });
    dispatch(deleteWorkflows(canceledWorkflowsIds));
  }catch (error){
    console.log(error);
  }
};

export default cancelWorkflowInstances;
