import { rexFlowActionTypes } from "../actions";
import { INITIAL } from "../../constants/networkStates";

export const INITIAL_STATE = {
  workflows: {
    fetchState: INITIAL,
    message: "",
    available: [],
  },
  activeInteractionId: "",
  interactions: {
    /*
    [phoneNumber]: {
      workflows: {
        fetchState: INITIAL,
        message: "",
        instantiated: [{
         // dont' worry about this in interaction component
         tasks: []
        }],
        activeWorkflowId: "",
      }
    }
    */
  },
};

const INITIAL_INTERACTION_STATE = {
  workflows: {
    fetchState: INITIAL,
    message: "",
    instantiated: [],
    activeWorkflowId: "",
  }
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

const setActiveWorkflows = (activeWorkflows, { workflows }, initializedByName ) => {

  if(!Array.isArray(activeWorkflows))
    return workflows;

  const newWorkflows = workflows?.filter(({iid}) => !activeWorkflows.find(({iid: activeWFIID}) => activeWFIID === iid));
  const deletedWorkflows = activeWorkflows?.filter(({iid}) => !workflows.find(({iid: activeWFIID}) => activeWFIID === iid));

  if (!newWorkflows?.length && !deletedWorkflows?.length)
    return activeWorkflows;

  let calculatedWorkflows = [];

  if (deletedWorkflows?.length && !initializedByName)
    calculatedWorkflows = activeWorkflows.map((currentEl) => {
      const workflow = deletedWorkflows.find(({iid: activeWFIID}) => activeWFIID === currentEl.iid)
      currentEl.isFinished = !!workflow;
      return currentEl;
    });

  if(newWorkflows?.length)
    calculatedWorkflows = [...calculatedWorkflows, ...newWorkflows];

  return calculatedWorkflows;



  /*
  *
  * Adding new wf
  * Updating previous ones
  *
  *
  *
  * */


}

const addWorkflow = (currentWorkflows, newWorkflow) => {
  const isExistingWorkflow = !!currentWorkflows.find(({iid}) => iid === newWorkflow.iid);
  if (isExistingWorkflow){
    return currentWorkflows;
  }
  return [...currentWorkflows, newWorkflow];
}

const setWorkflowFinished = (iid, activeWorkflows) => {
  let selectedWorkflow = undefined;
  const unselectedWorkflows = [];
  activeWorkflows.forEach((currentWorkflow) => {
    if (currentWorkflow.iid === iid){
      selectedWorkflow = {
        ...currentWorkflow,
        isFinished: true
      };
    }else {
      unselectedWorkflows.push(currentWorkflow);
    }
  });
  return  [...unselectedWorkflows, selectedWorkflow];
}

const rexFlowReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
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

    case rexFlowActionTypes.ADD_INTERACTION: {
      return {
        ...state,
        interactions: {
          ...state.interactions,
          [payload]: INITIAL_INTERACTION_STATE
        }
      }
    }

    case rexFlowActionTypes.REMOVE_INTERACTION: {
      const updatedInteractions = { ...state.interactions };
      delete updatedInteractions[payload];

      return {
        ...state,
        interactions: updatedInteractions
      }
    }

    case rexFlowActionTypes.SET_ACTIVE_INTERACTION_ID: {
      return {
        ...state,
        activeInteractionId: payload
      }
    }

    case rexFlowActionTypes.SET_INSTANTIATED_WORKFLOW_FETCH_STATE: {
      const { interactionId, fetchState } = payload;
      return {
        ...state,
        interactions: {
          ...state.interactions,
          [interactionId]: {
            ...state.interactions[interactionId],
            fetchState
          }
        }
      }
    }

    case rexFlowActionTypes.SET_INSTANTIATED_WORKFLOW_MESSAGE: {
      const { interactionId, message } = payload;
      return {
        ...state,
        interactions: {
          ...state.interactions,
          [interactionId]: {
            ...state.interactions[interactionId],
            message
          }
        }
      }
    }

    case rexFlowActionTypes.ADD_INSTANTIATED_WORKFLOW: {
      const { interactionId, workflow } = payload;
      return {
        ...state,
        interactions: {
          ...state.interactions,
          [interactionId]: {
            ...state.interactions[interactionId],
            workflows: [
              ...state.interactions[interactionId].workflows,
              workflow
            ]
          }
        }
      }
    }

    case rexFlowActionTypes.REMOVE_INSTANTIATED_WORKFLOW: {
      const { interactionId, iid } = payload;
      return {
        ...state,
        interactions: {
          ...state.interactions,
          [interactionId]: {
            ...state.interactions[interactionId],
            workflows: state.interactions[interactionId].workflows
              .filter((workflow) => workflow.iid === iid)
          }
        }
      }
    }

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
      const { activeWorkflows, initializedByName } = state;
      return {
        ...state,
        activeWorkflows: setActiveWorkflows(activeWorkflows, payload, initializedByName)
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
      const { tasksState } = state;
      return {
        ...state,
        tasksState: {
          ...tasksState,
          [taskId]: {
            isTaskCompleted: isTaskCompleted,
          },
        },
      };
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
    case rexFlowActionTypes.SET_IS_TALK_TRACK_BEING_FETCHED: {
      const { isATalkTrackBeingFetched } = payload;
      return {
        ...state,
        isATalkTrackBeingFetched,
      };
    }
    case rexFlowActionTypes.SET_AVAILABLE_TALK_TRACKS: {
      const { availableTalkTracks } = payload;
      return {
        ...state,
        availableTalkTracks,
      };
    }
    case rexFlowActionTypes.SET_IS_FLEX_TASK_ACCEPTED: {
      const { isFlexTaskAccepted } = payload;
      return {
        ...state,
        isFlexTaskAccepted,
      };
    }
    case rexFlowActionTypes.DELETE_WORKFLOWS: {
      const { canceledWorkflows } = payload;
      const { activeWorkflows } = state;
      const newActiveWorkflows = activeWorkflows.filter( currentActiveWorkflow => !canceledWorkflows.includes(currentActiveWorkflow) );
      return {
        ...state,
        activeWorkflows: newActiveWorkflows,
      };
    }
    case rexFlowActionTypes.SET_BUTTONS_STATE: {
      const { buttonName, buttonState } = payload;
      return {
        ...state,
        buttons: {
          ...state.buttons,
          [buttonName]: buttonState,
        },
      };
    }
    case rexFlowActionTypes.SET_ACTIVE_TALK_TRACK: {
      const { activeTalkTrack } = payload;
      return {
        ...state,
        activeTalkTrack
      };
    }
    case rexFlowActionTypes.RESET_TASKS: {
      return {
        ...state,
        tasks: null,
      };
    }
    case rexFlowActionTypes.RESET_TASK_DATA: {
      const { iid } = payload;
      const { tasks } = state;
      return {
        ...state,
        tasks: {
          ...tasks,
          [iid]: null,
        },
      };
    }








    case rexFlowActionTypes.REMOVE_TASK: {
      const { iid, task } = payload;
      const { activeWorkflows } = state;
      const newWorkflows = activeWorkflows.map((currentWorkflow) => {
        if (currentWorkflow.iid !== iid){
          return currentWorkflow;
        }
        const { tasks } = currentWorkflow;
        const newTasks = tasks.filter(({ tid }) => task.tid !== tid);
        return {
          ...currentWorkflow,
          tasks: newTasks
        };
      });
      return {
        ...state,
        activeWorkflows: newWorkflows
      }
    }
    case rexFlowActionTypes.SET_WORKFLOW_FINISHED: {
      const { iid } = payload;
      const { activeWorkflows } = state;
      const newWorkflows = setWorkflowFinished(iid, activeWorkflows);
      return {
        ...state,
        activeWorkflows: newWorkflows
      };
    }
    case rexFlowActionTypes.SET_WORKFLOWS_FINISHED: {
      const { iids } = payload;
      const { activeWorkflows } = state;
      let newWorkflows = [...activeWorkflows];
      iids.forEach((currentIid) => newWorkflows = setWorkflowFinished(currentIid, newWorkflows));
      return {
        ...state,
        activeWorkflows: newWorkflows
      };
    }
    case rexFlowActionTypes.ADD_WORKFLOW: {
      const { activeWorkflows } = state;
      const { workflow } = payload;
      return {
        ...state,
        activeWorkflows: addWorkflow(activeWorkflows, workflow),
      };
    }
    case rexFlowActionTypes.ADD_WORKFLOWS: {
      const { workflows } = payload;
      const { activeWorkflows } = state;
      let newWorkflows = [...activeWorkflows];
      workflows.forEach((currentWorkflow) => newWorkflows = addWorkflow(newWorkflows, currentWorkflow));
      return {
        ...state,
        activeWorkflows: newWorkflows
      }
    }
    default:
      return state;
  }
};

export default rexFlowReducer;
