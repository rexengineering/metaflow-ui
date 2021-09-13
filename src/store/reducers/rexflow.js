import { INITIAL } from "../../constants/networkStates";
import { rexFlowActionTypes } from "../actions";

export const INITIAL_STATE = {
  workflows: {
    fetchState: INITIAL,
    message: "",
    available: [],
  },
  activeInteractionId: "",
  interactions: {},
};

const INITIAL_INTERACTION_STATE = {
  workflows: [],
  activeWorkflowId: "",
};

export const INITIAL_WORKFLOW_STATE = {
  requestId: "",
  fetchState: INITIAL,
  message: "",
  tasks: [],
  iid: "",
  did: "",
  name: "",
  metadata: {},
};

const updateInstantiatedWorkflowProp = (interactionsState, interactionId, requestId, propKey, propValue) => {
  const interactionState = interactionsState[interactionId];
  const { workflows } = interactionState;
  return workflows.map((currentWorkflow) => {
    const { requestId: currentRequestId } = currentWorkflow;
    if (requestId === currentRequestId){
      return {
        ...currentWorkflow,
        [propKey]: propValue
      }
    }
    return currentWorkflow;
  });
}

const rexFlowReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case rexFlowActionTypes.ADD_INTERACTION: {
      const { interactionIdentifier } = payload;
      return {
        ...state,
        interactions: {
          ...state.interactions,
          [interactionIdentifier]: INITIAL_INTERACTION_STATE,
        }
      }
    }
    case rexFlowActionTypes.SET_AVAILABLE_WORKFLOWS_FETCH_STATE: {
      return {
        ...state,
        workflows: {
          ...state.workflows,
          fetchState: payload,
        }
      }
    }
    case rexFlowActionTypes.SET_AVAILABLE_WORKFLOWS_MESSAGE: {
      return {
        ...state,
        workflows: {
          ...state.workflows,
          message: payload,
        }
      }
    }
    case rexFlowActionTypes.SET_AVAILABLE_WORKFLOWS: {
      return {
        ...state,
        workflows: {
          ...state.workflows,
          available: payload,
        }
      }
    }
    case rexFlowActionTypes.REMOVE_INTERACTION: {
      const { interactionIdentifier } = payload;
      const updatedInteractions = { ...state.interactions };
      delete updatedInteractions[interactionIdentifier];
      return {
        ...state,
        interactions: updatedInteractions,
      }
    }
    case rexFlowActionTypes.SET_ACTIVE_INTERACTION_ID: {
      return {
        ...state,
        activeInteractionId: payload
      }
    }
    case rexFlowActionTypes.ADD_NEW_INSTANTIATED_WORKFLOW: {
      const { interactionId, requestId } = payload;
      const interactionState = state.interactions[interactionId];
      const newWorkflow = {...INITIAL_WORKFLOW_STATE, requestId };
      return {
        ...state,
        interactions: {
          ...state.interactions,
          [interactionId]: {
            ...interactionState,
            workflows: [
              ...interactionState.workflows,
              newWorkflow
            ]
          }
        }
      }
    }
    case rexFlowActionTypes.SET_INSTANTIATED_WORKFLOW_FETCH_STATE: {
      const { interactionId, fetchState, requestId } = payload;
      const updatedWorkflows = updateInstantiatedWorkflowProp(state.interactions, interactionId, requestId, 'fetchState', fetchState);
      const interactionState = state.interactions[interactionId];
      return {
        ...state,
        interactions: {
          ...state.interactions,
          [interactionId]: {
            ...interactionState,
            workflows: updatedWorkflows
          }
        }
      }
    }
    case rexFlowActionTypes.SET_INSTANTIATED_WORKFLOW_MESSAGE: {
      const { interactionId, message, requestId } = payload;
      const updatedWorkflows = updateInstantiatedWorkflowProp(state.interactions, interactionId, requestId, 'message', message);
      const interactionState = state.interactions[interactionId];
      return {
        ...state,
        interactions: {
          ...state.interactions,
          [interactionId]: {
            ...interactionState,
            workflows: updatedWorkflows
          }
        }
      }
    }
    case rexFlowActionTypes.UPDATE_INSTANTIATED_WORKFLOW: {
      const { interactionId, workflow, requestId } = payload;
      const interactionState = state.interactions[interactionId];
      const { iid, name, did, metadata } = workflow;
      const { workflows } = interactionState;
      const workflowIndex = workflows.findIndex(({ iid: currentIid }) => iid === currentIid);
      const isDuplicated = workflowIndex !== -1;
      const updatedWorkflows = isDuplicated
         ? [...workflows].splice(workflowIndex, 1)
         : workflows.map((currentWorkflow) => {
              const { requestId: currentRequestId } = currentWorkflow;
              if (requestId === currentRequestId){
                return {
                  ...currentWorkflow,
                  name,
                  did,
                  metadata,
                  iid
                }
              }
              return currentWorkflow;
            });
      return {
        ...state,
        interactions: {
          ...state.interactions,
          [interactionId]: {
            ...interactionState,
            workflows: updatedWorkflows
          }
        }
      }
    }
    case rexFlowActionTypes.REMOVE_INSTANTIATED_WORKFLOW: {
      const { interactionId, workflowIid } = payload;
      const interactionState = state.interactions[interactionId];
      const { workflows } = interactionState;
      const canceledWorkflowIndex = workflows.findIndex(({ iid }) => iid === workflowIid);
      if (canceledWorkflowIndex < 0){
        return state;
      }
      const updatedWorkflows = [...workflows];
      updatedWorkflows.splice(canceledWorkflowIndex, 1);
      return {
        ...state,
        interactions: {
          ...state.interactions,
          [interactionId]: {
            ...interactionState,
            workflows: updatedWorkflows
          }
        }
      }
    }
    case rexFlowActionTypes.ADD_TASK: {
      const { interactionId, workflowIid, task } = payload;
      const interactionState = state.interactions[interactionId];
      const { workflows } = interactionState;
      const updatedWorkflows = workflows.map((currentWorkflow) => {
        const { iid } = currentWorkflow;
        if (iid === workflowIid){
          const { tasks } = currentWorkflow;
          return {
            ...currentWorkflow,
            tasks: [...tasks, task]
          }
        }
        return currentWorkflow;
      });
      return {
        ...state,
        interactions: {
          ...state.interactions,
          [interactionId]: {
            ...interactionState,
            workflows: updatedWorkflows
          }
        }
      }
    }
    case rexFlowActionTypes.UPDATE_TASK: {
      const { interactionId, workflowIid, taskId, updatedTask } = payload;
      const interactionState = state.interactions[interactionId];
      const { workflows } = interactionState;

      const updatedWorkflows = workflows.map((currentWorkflow) => {
        const { iid } = currentWorkflow;
        if (iid === workflowIid){
          const { tasks } = currentWorkflow;
          const updatedTasks = tasks.map((currentTask) => {
            const { tid } = currentTask;
            if (tid !== taskId){
              return currentTask;
            }
            return {
              ...updatedTask,
              tid,
            }
          });
          return {
            ...currentWorkflow,
            tasks: updatedTasks
          }
        }
        return currentWorkflow;
      });

      return {
        ...state,
        interactions: {
          ...state.interactions,
          [interactionId]: {
            ...interactionState,
            workflows: updatedWorkflows
          }
        }
      }
    }
    case rexFlowActionTypes.REMOVE_TASK: {

      const { interactionId, workflowIid, taskId } = payload;
      const interactionState = state.interactions[interactionId];
      const { workflows } = interactionState;

      const updatedWorkflows = workflows.map((currentWorkflow) => {
        const { iid } = currentWorkflow;
        if (iid === workflowIid){
          const { tasks } = currentWorkflow;
          const updatedTasks = [...tasks];
          const taskIndex = updatedTasks.findIndex(({ tid }) => taskId === tid);
          if (taskIndex === -1){
            return currentWorkflow;
          }
          updatedTasks.splice(taskIndex, 1);
          return {
            ...currentWorkflow,
            tasks: updatedTasks
          }
        }
        return currentWorkflow;
      });

      return {
        ...state,
        interactions: {
          ...state.interactions,
          [interactionId]: {
            ...interactionState,
            workflows: updatedWorkflows
          }
        }
      }
    }
    default:
      return state;
  }
};

export default rexFlowReducer;
