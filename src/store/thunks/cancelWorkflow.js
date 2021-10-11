import { apolloClient } from "./index";
import { cancelAllWorkflows } from "../queries";
import {
    removeInstantiatedWorkflow,
    setInstantiatedWorkflowFetchState,
    setInstantiatedWorkflowMessage
} from "../actions";
import { FAILURE, REQUEST, SUCCESS } from "../../constants/networkStates";

const cancelWorkflow = (workflowIid) => async (dispatch, getState) => {

const { rexFlow: { instantiatedWorkflows } } = getState();
const workflow = instantiatedWorkflows.find(({ iid }) => iid === workflowIid);
const { requestId } = workflow;

try {

    dispatch(setInstantiatedWorkflowFetchState(requestId, REQUEST));

    const response = await apolloClient.mutate({
        mutation: cancelAllWorkflows,
        variables: {
            cancelWorkflowInput: {
                iid: [workflowIid],
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

    if (canceledWorkflow !== workflowIid){
        throw new Error(`Workflow ${workflowIid} was not canceled, it is not part of the canceled workflow list`);
    }

    dispatch(setInstantiatedWorkflowFetchState(requestId, SUCCESS));
    dispatch(removeInstantiatedWorkflow(workflowIid));

}catch (error){
    dispatch(setInstantiatedWorkflowFetchState(requestId, FAILURE));
    dispatch(setInstantiatedWorkflowMessage(error?.message ?? error, requestId));
}

}

export default cancelWorkflow;