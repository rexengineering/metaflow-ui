import { initWorkflowByName } from "../queries";
import { apolloClient } from "./";
import {
    updateInstantiatedWorkflow,
    addNewInstantiatedWorkflow,
    setInstantiatedWorkflowFetchState,
    setInstantiatedWorkflowMessage
} from "../actions";
import { FAILURE, REQUEST, SUCCESS } from "../../constants/networkStates";
import { v4 as generateUUID } from "uuid";


const instantiateWorkflowByName = (workflowName) => async (dispatch) => {
    const requestId = generateUUID();
    dispatch(addNewInstantiatedWorkflow({ requestId, name: workflowName }));

    try {
       dispatch(setInstantiatedWorkflowFetchState(requestId, REQUEST));

        const mutation = initWorkflowByName(workflowName);
        const response = await apolloClient.mutate({ mutation });
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

    }catch (error){
        dispatch(setInstantiatedWorkflowFetchState(requestId, FAILURE));
        dispatch(setInstantiatedWorkflowMessage(error?.message ?? error, requestId));
    }

};

export default instantiateWorkflowByName;