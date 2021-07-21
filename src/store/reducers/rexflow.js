import { rexFlowActionTypes } from "../actions";

const xxx = {
  isWorkflowBeingInitialized: {},
  isLoadingFetchTasks: false,
  activeWorkflows: [],
  tasks: null,
  error: null,
  tasksState: {},
  deployments: [],
};

const INITIAL_STATE = {
  instances: {},
  activeWorkflows: [],
  deployments: [],
  error: null,
};



const updateTasksState = (state, taskId, propKey, propValue, instanceID) => {
  const { tasksState } = state;
  const taskState = tasksState[taskId];
  const instances = state.instances ?? {};
  const instanceState = instances[instanceID] ?? {};
  return {
    ...state,
    instances: {
      ...instances,
      [instanceID]: {
        ...instanceState,
        tasksState: {
          ...tasksState,
          [taskId]: {
            ...taskState,
            [propKey]: propValue,
          },
        },
      },
    },
  };
};

const rexFlowReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case rexFlowActionTypes.INIT_WORKFLOW_IS_LOADING: {
      const { isLoading, deploymentID, instanceID } = payload;
      const instances = state.instances ?? {};
      const instanceState = instances[instanceID] ?? {};
      return {
        ...state,
        instances: {
          ...instances,
          [instanceID]: {
            ...instanceState,
            isLoadingWorkflowInit: {
              ...instanceState.isWorkflowBeingInitialized,
              [deploymentID]: isLoading,
            }
          }
        },
      };
    }
    case rexFlowActionTypes.INIT_WORKFLOW_SUCCESSFUL: {
      const { workflows } = payload;
      return {
        ...state,
        activeWorkflows: Array.isArray(workflows)
          ? workflows
          : [...state.activeWorkflows, workflows],
      };
    }
    case rexFlowActionTypes.INIT_WORKFLOW_FAILURE:
      return {
        ...state,
        error: payload.error,
      };
    case rexFlowActionTypes.FETCH_TASKS_SUCCESS: {
      const { task, workflowId, instanceID } = payload;
      const instances = state.instances ?? {};
      const instanceState = instances[instanceID] ?? {};
      return {
        ...state,
        instances: {
          ...instances,
          [instanceID]: {
            ...instanceState,
            tasks: {
              ...instanceState.tasks,
              [workflowId]: task,
            }
          }
        }
      };
    }
    case rexFlowActionTypes.SAVE_TASK_DATA_IS_LOADING: {
      const { taskId, isLoading, instanceID } = payload;
      return updateTasksState(state, taskId, "isLoading", isLoading, instanceID);
    }
    case rexFlowActionTypes.FETCH_TASKS_IS_LOADING: {
      const { isLoading, instanceID } = payload;
      const instances = state.instances ?? {};
      const instanceState = instances[instanceID] ?? {};
      return {
        ...state,
        instances: {
          ...instances,
          [instanceID]: {
            ...instanceState,
            isLoadingFetchTasks: isLoading
          }
        },
      };
    }
    case rexFlowActionTypes.IS_TASK_COMPLETED: {
      const { taskId, isTaskCompleted, instanceID } = payload;
      return updateTasksState(
        state,
        taskId,
        "isTaskCompleted",
        isTaskCompleted,
        instanceID
      );
    }
    case rexFlowActionTypes.SAVE_TASK_DATA_FAILURE: {
      const { taskId, errors, instanceID } = payload;
      return updateTasksState(state, taskId, "errors", errors, instanceID);
    }
    case rexFlowActionTypes.SAVE_TASK_DATA_EXCEPTION: {
      const { taskId, errorMessage, instanceID } = payload;
      return updateTasksState(state, taskId, "exceptionError", errorMessage, instanceID);
    }
    case rexFlowActionTypes.SET_DEPLOYMENT_ID: {
      const { deployments } = payload;
      return {
        ...state,
        deployments,
      };
    }
    default:
      return state;
  }
};

export default rexFlowReducer;
