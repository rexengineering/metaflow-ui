/*import {
    setAvailableWorkflows,
    setAvailableWorkflowsFetchState,
    setAvailableWorkflowsMessage,
} from "../actions";
import { getAvailableDeployments } from "../queries";
import { FAILURE, REQUEST, SUCCESS } from "../../constants/networkStates";
*/
import { INITIAL_STATE } from "../../reducers/rexflow";
import { apolloClient } from "../index";
import { getTasks } from "../../queries";

const fetchAvailableWorkflows = () => async (dispatch) => {
    try {
        //dispatch(setAvailableWorkflowsFetchState(REQUEST));

        const response = await apolloClient.query({
            query: getTasks,
        });
        const workflows = response?.workflows?.active;
        const mappedWorkflows = workflows.map(({ iid, metadata, name, did }) => {
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
        });

        /*dispatch(setAvailableWorkflowsFetchState(SUCCESS));
        dispatch(setAvailableWorkflows(availableWorkflows));*/
    } catch (error) {
        /*dispatch(setAvailableWorkflowsFetchState(FAILURE));
        dispatch(setAvailableWorkflowsMessage(error?.message ?? error));
        dispatch(setAvailableWorkflows(INITIAL_STATE.workflows.available));*/
    }
};

export default fetchAvailableWorkflows;