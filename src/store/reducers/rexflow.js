import { rexFlowActionTypes } from "../actions";

const INITIAL_STATE = {
  isWorkflowBeingInitialized: {},
  isLoadingFetchTasks: false,
  activeWorkflows: null,
  tasks: null,
  error: null,
  tasksState: {},
  deployments: [],
  isFlexTaskActive: true,
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

const setActiveWorkflows = (activeWorkflows, { workflows }) => {

  if(!Array.isArray(activeWorkflows))
    return workflows;

  const newWorkflows = workflows?.filter(({iid}) => !activeWorkflows.find(({iid: activeWFIID}) => activeWFIID === iid));
  const deletedWorkflows = activeWorkflows?.filter(({iid}) => !workflows.find(({iid: activeWFIID}) => activeWFIID === iid));

  if (!newWorkflows?.length && !deletedWorkflows?.length)
    return activeWorkflows;

  let result = [];

  if (deletedWorkflows?.length)
    result = activeWorkflows.filter((currentEl) => !deletedWorkflows.find(({iid: activeWFIID}) => activeWFIID === currentEl));

  if(newWorkflows?.length)
    result = [...result, ...newWorkflows];

  return result;
}

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
      const { activeWorkflows } = state;
      return {
        ...state,
        activeWorkflows: setActiveWorkflows(activeWorkflows, payload)
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
      const { taskId, errors } = payload;
      return updateTasksState(state, taskId, "errors", errors);
    }
    case rexFlowActionTypes.SAVE_TASK_DATA_EXCEPTION: {
      const { taskId, errorMessage } = payload;
      return updateTasksState(state, taskId, "exceptionError", errorMessage);
    }
    case rexFlowActionTypes.SET_DEPLOYMENT_ID: {
      const { deployments } = payload;
      return {
        ...state,
        deployments,
      };
    }
    case rexFlowActionTypes.SET_IS_FLEX_TASK_ACTIVE: {
      const { isFlexTaskActive } = payload;
      return {
        ...state,
        isFlexTaskActive,
      };
    }
    default:
      return state;
  }
};

export default rexFlowReducer;
