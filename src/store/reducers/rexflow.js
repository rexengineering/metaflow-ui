import { INITIAL } from "../../constants/networkStates";
import { rexFlowActionTypes } from "../actions";
import deepMerge from "../../utils/objectManipulation";

export const INITIAL_STATE = {
  workflows: {
    fetchState: INITIAL,
    message: "",
    available: [],
  },
  activeInteractionId: "",
  instantiatedWorkflows: [],
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

const updateInstantiatedWorkflowProp = (state, identifierProp, workflowIdentifier, propKey, propValue) => {
  const { instantiatedWorkflows } = state;
  return instantiatedWorkflows.map((currentWorkflow) => {
    if (workflowIdentifier === currentWorkflow[identifierProp]){
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
    case rexFlowActionTypes.SET_AVAILABLE_WORKFLOWS_FETCH_STATE: {
      const { fetchState } = payload;
      return {
        ...state,
        workflows: {
          ...state.workflows,
          fetchState,
        }
      }
    }
    case rexFlowActionTypes.SET_AVAILABLE_WORKFLOWS_MESSAGE: {
      const { message } = payload;
      return {
        ...state,
        workflows: {
          ...state.workflows,
          message,
        }
      }
    }
    case rexFlowActionTypes.SET_AVAILABLE_WORKFLOWS: {
      const { workflows } = payload;
      return {
        ...state,
        workflows: {
          ...state.workflows,
          available: workflows,
        }
      }
    }
    case rexFlowActionTypes.ADD_NEW_INSTANTIATED_WORKFLOW: {
      const { workflow } = payload;
      const newWorkflow = {...INITIAL_WORKFLOW_STATE, ...workflow };
      return {
        ...state,
        instantiatedWorkflows: [
          ...state.instantiatedWorkflows,
          newWorkflow
        ]
      }
    }
    case rexFlowActionTypes.SET_INSTANTIATED_WORKFLOW_FETCH_STATE: {
      const { requestId, fetchState } = payload;
      const updatedWorkflows = updateInstantiatedWorkflowProp(state, "requestId", requestId, 'fetchState', fetchState);
      return {
        ...state,
        instantiatedWorkflows: updatedWorkflows
      }
    }
    case rexFlowActionTypes.SET_INSTANTIATED_WORKFLOW_MESSAGE: {
      const { message, requestId } = payload;
      const updatedWorkflows = updateInstantiatedWorkflowProp(state, "requestId", requestId, 'message', message);
      return {
        ...state,
        instantiatedWorkflows: updatedWorkflows
      }
    }
    case rexFlowActionTypes.UPDATE_INSTANTIATED_WORKFLOW: {
      const { workflow: updatedWorkflow, workflowIdentifier,  searchBy} = payload;
      const { instantiatedWorkflows } = state;
      const workflowIndex = instantiatedWorkflows.findIndex(( currentWorkflow ) => workflowIdentifier === currentWorkflow[searchBy]);
      const isDuplicated = workflowIndex === -1;

      const updatedWorkflows = isDuplicated
           ? [...instantiatedWorkflows].splice(workflowIndex, 1)
           : instantiatedWorkflows.map((currentWorkflow) => workflowIdentifier === currentWorkflow[searchBy]
                  ? updatedWorkflow
                  : currentWorkflow
             );

      return {
        ...state,
        instantiatedWorkflows: updatedWorkflows
      }
    }

    case rexFlowActionTypes.REMOVE_INSTANTIATED_WORKFLOW: {
      const { iid } = payload;
      const { instantiatedWorkflows } = state;
      const canceledWorkflowIndex = instantiatedWorkflows.findIndex(({ iid: currentIid }) => iid === currentIid);
      if (canceledWorkflowIndex < 0){
        return state;
      }
      const updatedWorkflows = [...instantiatedWorkflows];
      updatedWorkflows.splice(canceledWorkflowIndex, 1);

      return {
        ...state,
        instantiatedWorkflows: updatedWorkflows
      }
    }
    case rexFlowActionTypes.ADD_TASK: {
      const { workflowIid, task } = payload;
      const { instantiatedWorkflows } = state;
      const updatedWorkflows = instantiatedWorkflows.map((currentWorkflow) => {
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
        instantiatedWorkflows: updatedWorkflows
      }
    }

    case rexFlowActionTypes.UPDATE_TASK: {

      const { workflowIid, taskId, updatedTask } = payload;
      const { instantiatedWorkflows } = state;

      const workflow = instantiatedWorkflows.find(({ iid }) => iid === workflowIid);
      if (!workflow){
        return state;
      }
      const { tasks } = workflow;
      const oldTask = tasks.find(({ tid }) => tid === taskId);
      const {
          iid,
          tid,
          ...oldTaskChanges
      } = oldTask;

      const newTask = deepMerge(oldTaskChanges, updatedTask, 'dataId');
      const updatedWorkflows = instantiatedWorkflows.map((currentWorkflow) => {
        const { iid, tasks } = currentWorkflow;
        if (iid !== workflowIid){
          return currentWorkflow;
        }

        return {
          ...currentWorkflow,
          tasks: tasks.map((currentTask) => {
            const { tid } = currentTask;
            if (tid === taskId){
              return newTask;
            }
            return currentTask;
          })
        }

      });


      return {
        ...state,
        instantiatedWorkflows: updatedWorkflows
      }

    }

    case rexFlowActionTypes.REMOVE_TASK: {

      const { workflowIid, taskId } = payload;
      const { instantiatedWorkflows } = state;

      const updatedWorkflows = instantiatedWorkflows.map((currentWorkflow) => {
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
        instantiatedWorkflows: updatedWorkflows
      }

    }
    default:
      return state;
  }
};

export default rexFlowReducer;
