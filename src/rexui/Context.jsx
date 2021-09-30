import { createContext, useReducer } from "react";
import rexFlowReducer, { INITIAL_STATE } from "./store/reducers/rexflow";
import {setIsTaskCompleted, setIsTaskCompleted as setIsTaskCompletedAction} from "./store/actions";
import cancelWorkflowThunk from "./store/thunks/cancelWorkflow";
import instantiateWorkflowByNameThunk from "./store/thunks/instantiateWorkflowByName";
import instantiateWorkflowThunk from "./store/thunks/instantiateWorkflow";
import completeTaskThunk from "./store/thunks/completeTask";

export const Context = createContext( {} ); // ??

function RexFlowContext({ children }){

    const [state, dispatch] = useReducer(rexFlowReducer, INITIAL_STATE, undefined);

    // thunks
    const cancelWorkflow = (interactionId, workflowId) => cancelWorkflowThunk(dispatch, state, interactionId, workflowId);
    const instantiateWorkflowByName = (interactionId, workflowName) => instantiateWorkflowByNameThunk(dispatch, interactionId, workflowName);
    const instantiateWorkflow = (interactionId, did) => instantiateWorkflowThunk(dispatch, interactionId, did);
    const completeTask = (formFields, task, persistent) => completeTaskThunk(dispatch, formFields, task, persistent);

    //actions
    const setIsTaskCompleted = (taskId, isTaskCompleted) => dispatch(setIsTaskCompletedAction(taskId, isTaskCompleted));

    const context = {
        dispatch,
        state,
        actions: {
            setIsTaskCompleted
        },
        thunks: {
            cancelWorkflow,
            instantiateWorkflowByName,
            instantiateWorkflow,
            completeTask
        }
    }

    return (
        <Context.Provider value={ context }>
            { children }
        </Context.Provider>
    );

}


export default RexFlowContext;