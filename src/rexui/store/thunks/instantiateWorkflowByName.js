import { initWorkflowByName } from "../queries";
import { apolloClient } from "./index";
import {
    updateInstantiatedWorkflow,
    addNewInstantiatedWorkflow,
    setInstantiatedWorkflowFetchState,
    setInstantiatedWorkflowMessage
} from "../actions";
import { FAILURE, REQUEST, SUCCESS } from "../../../constants/networkStates";
import { formatWorkflow } from "../../../utils/thunks";
import { v4 as generateUUID } from "uuid";


const instantiateWorkflowByName = async (dispatch, interactionId, workflowName) => {
    const requestId = generateUUID();
    dispatch(addNewInstantiatedWorkflow(interactionId, requestId));

    try {
        dispatch(setInstantiatedWorkflowFetchState(interactionId, requestId, REQUEST));

        const mutation = initWorkflowByName(workflowName);
        const result = await apolloClient.mutate({ mutation });
        const {
            data: {
                workflow: {
                    startByName : { workflow }
                }
            }
        } = result;

        const formattedWorkflow = formatWorkflow(workflow);

        dispatch(setInstantiatedWorkflowFetchState(interactionId, requestId, SUCCESS));
        dispatch(updateInstantiatedWorkflow(interactionId, formattedWorkflow, requestId));
    }catch (error){
        dispatch(setInstantiatedWorkflowFetchState(interactionId, requestId, FAILURE));
        dispatch(setInstantiatedWorkflowMessage(interactionId, error?.message ?? error, requestId));
    }

};

export default instantiateWorkflowByName;