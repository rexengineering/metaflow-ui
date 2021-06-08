import { rexFlowActionTypes } from "../actions";

const INITIAL_STATE = {
  isWorkflowBeingInitialized: {},
  isLoadingFetchTasks: false,
  activeWorkflows: [],
  tasks: null,
  error: null,
  tasksState: {},
  deployments: [],
};

const updateTasksState = (state, taskId, propKey, propValue) => {
  const { tasksState } = state;
  const taskState = tasksState[taskId];
  return {
    ...state,
    tasksState: {
      ...tasksState,
      [taskId]: {
        ...taskState,
        [propKey]: propValue,
      },
    },
  };
};

const rexFlowReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case rexFlowActionTypes.INIT_WORKFLOW_IS_LOADING: {
      const { isLoading, deploymentID } = payload;
      return {
        ...state,
        isLoadingWorkflowInit: {
          ...state.isWorkflowBeingInitialized,
          [deploymentID]: isLoading,
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
      const { task, workflowId } = payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [workflowId]: task,
        },
      };
    }
    case rexFlowActionTypes.SAVE_TASK_DATA_IS_LOADING: {
      const { taskId, isLoading } = payload;
      return updateTasksState(state, taskId, "isLoading", isLoading);
    }
    case rexFlowActionTypes.FETCH_TASKS_IS_LOADING: {
      const { isLoading } = payload;
      return {
        ...state,
        isLoadingFetchTasks: isLoading,
      };
    }
    case rexFlowActionTypes.IS_TASK_COMPLETED: {
      const { taskId, isTaskCompleted } = payload;
      return updateTasksState(
        state,
        taskId,
        "isTaskCompleted",
        isTaskCompleted
      );
    }
    case rexFlowActionTypes.SAVE_TASK_DATA_FAILURE: {
      const { taskId, error } = payload;
      return updateTasksState(state, taskId, "error", error);
    }
    case rexFlowActionTypes.SET_DEPLOYMENT_ID: {
      const { deployments } = payload;
      return {
        ...state,
        deployments: [...state.deployments, ...deployments],
      };
    }
    default:
      return state;
  }
};

export default rexFlowReducer;