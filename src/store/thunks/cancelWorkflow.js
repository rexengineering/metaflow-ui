import { apolloClient } from "./index";
import { cancelAllWorkflows } from "../queries";
import {
    removeInstantiatedWorkflow,
    setInstantiatedWorkflowFetchState,
    setInstantiatedWorkflowMessage
} from "../actions";
import { FAILURE, REQUEST, SUCCESS } from "../../constants/networkStates";

const cancelWorkflow = (interactionId, workflowIID) => async (dispatch, getState) => {

    const { rexFlow: { interactions } } = getState();
    const { workflows } = interactions[interactionId] ?? {};
    const workflow = workflows.find(({ iid }) => iid === workflowIID);
    const { requestId } = workflow;

    try {

        dispatch(setInstantiatedWorkflowFetchState(interactionId, requestId, REQUEST));

        const response = await apolloClient.mutate({
            mutation: cancelAllWorkflows,
            variables: {
                cancelWorkflowInput: {
                    iid: [workflowIID],
                },
            },
        });
        const {
            data: {
                workflow: {
                    cancel: {
                        iid: canceledWorkflowsIds
                    }
                }
            }
        } = response;
        const [ canceledWorkflow ] = canceledWorkflowsIds;

        if (canceledWorkflow !== workflowIID){
            throw new Error(`Workflow ${workflowIID} was not canceled, it is not part of the canceled workflow list`);
        }

        dispatch(setInstantiatedWorkflowFetchState(interactionId, requestId, SUCCESS));
        dispatch(removeInstantiatedWorkflow(interactionId, workflowIID));

    }catch (error){
        dispatch(setInstantiatedWorkflowFetchState(interactionId, requestId, FAILURE));
        dispatch(setInstantiatedWorkflowMessage(interactionId, error?.message ?? error, requestId));
    }

}

export default cancelWorkflow;