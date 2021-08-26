export const rexFlowActionTypes = {
  INIT_WORKFLOW_SUCCESSFUL: "INIT_WORKFLOW_SUCCESSFUL",
  INIT_WORKFLOW_FAILURE: "INIT_WORKFLOW_FAILURE",
  INIT_WORKFLOW_IS_LOADING: "INIT_WORKFLOW_IS_LOADING",
  FETCH_TASKS_SUCCESS: "FETCH_TASKS_SUCCESS",
  FETCH_TASKS_FAILURE: "FETCH_TASKS_FAILURE",
  FETCH_TASKS_IS_LOADING: "FETCH_TASKS_IS_LOADING",
  SAVE_TASK_DATA_IS_LOADING: "SAVE_TASK_DATA_IS_LOADING",
  SAVE_TASK_DATA_SUCCESS: "SAVE_TASK_DATA_SUCCESS",
  SAVE_TASK_DATA_FAILURE: "SAVE_TASK_DATA_FAILURE",
  SAVE_TASK_DATA_EXCEPTION: "SAVE_TASK_DATA_EXCEPTION",
  IS_TASK_COMPLETED: "IS_TASK_COMPLETED",
  SET_DEPLOYMENT_ID: "SET_DEPLOYMENT_ID",
  IS_FLEX_TASK_ACTIVE: "IS_FLEX_TASK_ACTIVE",
  SET_IS_FLEX_TASK_ACTIVE: "SET_IS_FLEX_TASK_ACTIVE",
  IS_TALK_TRACK_BEING_FETCHED: "IS_TALK_TRACK_BEING_FETCHED",
  SET_IS_TALK_TRACK_BEING_FETCHED: "SET_IS_TALK_TRACK_BEING_FETCHED",
  SET_AVAILABLE_TALK_TRACKS: "SET_AVAILABLE_TALK_TRACKS",
  IS_FLEX_TASK_ACCEPTED: "IS_TASK_ACCEPTED",
  SET_IS_FLEX_TASK_ACCEPTED: "SET_IS_TASK_ACCEPTED",
  SET_BUTTONS_STATE: "SET_BUTTONS_STATE",
  DELETE_WORKFLOWS: "DELETE_WORKFLOWS",
  SET_ACTIVE_TALK_TRACK: "SET_ACTIVE_TALK_TRACK",
  RESET_TASKS: "RESET_TASKS",
  SET_WORKFLOWS_FINISHED: "SET_WORKFLOWS_FINISHED",
  SET_WORKFLOW_FINISHED: "SET_WORKFLOW_FINISHED",
  RESET_TASK_DATA: "RESET_TASK_DATA",
  ADD_WORKFLOW: "ADD_WORKFLOW",
  ADD_WORKFLOWS: "ADD_WORKFLOWS",
  ADD_TASK: "ADD_TASK",
  UPDATING_TASK: "UPDATING_TASK",
  REMOVE_TASK: "REMOVE_TASK",

  SET_AVAILABLE_WORKFLOWS_FETCH_STATE: "SET_AVAILABLE_WORKFLOWS_FETCH_STATE",
  SET_AVAILABLE_WORKFLOWS_MESSAGE: "SET_AVAILABLE_WORKFLOWS_MESSAGE",
  SET_AVAILABLE_WORKFLOWS: "SET_AVAILABLE_WORKFLOWS",

  ADD_INTERACTION: "ADD_INTERACTION",
  REMOVE_INTERACTION: "REMOVE_INTERACTION",

  SET_ACTIVE_INTERACTION_ID: "SET_ACTIVE_INTERACTION_ID",

  SET_INSTANTIATED_WORKFLOW_FETCH_STATE: "SET_INSTANTIATED_WORKFLOW_FETCH_STATE",
  SET_INSTANTIATED_WORKFLOW_MESSAGE: "SET_INSTANTIATED_WORKFLOW_MESSAGE",
  ADD_INSTANTIATED_WORKFLOW: "ADD_INSTANTIATED_WORKFLOW",
  REMOVE_INSTANTIATED_WORKFLOW: "REMOVE_INSTANTIATED_WORKFLOW",
};

export const setAvailableWorkflowsFetchState = (fetchState) => ({
  type: rexFlowActionTypes.SET_AVAILABLE_WORKFLOWS_FETCH_STATE,
  payload: fetchState,
});

export const setAvailableWorkflowsMessage = (message) => ({
  type: rexFlowActionTypes.SET_AVAILABLE_WORKFLOWS_MESSAGE,
  payload: message,
});

export const setAvailableWorkflows = (workflows) => ({
  type: rexFlowActionTypes.SET_AVAILABLE_WORKFLOWS,
  payload: workflows,
});

export const addInteraction = (interactionId) => ({
  type: rexFlowActionTypes.ADD_INTERACTION,
  payload: interactionId,
});

export const removeInteraction = (interactionId) => ({
  type: rexFlowActionTypes.REMOVE_INTERACTION,
  payload: interactionId,
});

export const setActiveInteractionId = (interactionId) => ({
  type: rexFlowActionTypes.SET_ACTIVE_INTERACTION_ID,
  payload: interactionId,
});

export const setInstantiatedWorkflowFetchState = (interactionId, fetchState) => ({
  type: rexFlowActionTypes.SET_INSTANTIATED_WORKFLOW_FETCH_STATE,
  payload: {
    interactionId,
    fetchState
  },
});

export const setInstantiatedWorkflowMessage = (interactionId, message) => ({
  type: rexFlowActionTypes.SET_INSTANTIATED_WORKFLOW_MESSAGE,
  payload: {
    interactionId,
    message
  },
});

export const addInstantiatedWorkflow = (interactionId, workflow) => ({
  type: rexFlowActionTypes.ADD_INSTANTIATED_WORKFLOW,
  payload: {
    interactionId,
    workflow
  },
});

export const removeInstantiatedWorkflow = (interactionId, iid) => ({
  type: rexFlowActionTypes.REMOVE_INSTANTIATED_WORKFLOW,
  payload: {
    interactionId,
    iid
  },
});

export const addTask = (iid, tasks) => ({
  type: rexFlowActionTypes.ADD_TASK,
  payload: { iid, tasks },
});

export const addWorkflow = (workflow) => ({
  type: rexFlowActionTypes.ADD_WORKFLOW,
  payload: { workflow },
});

export const addWorkflows = (workflows) => ({
  type: rexFlowActionTypes.ADD_WORKFLOWS,
  payload: { workflows },
});

export const setWorkFlowFinished = (iid) => ({
  type: rexFlowActionTypes.SET_WORKFLOW_FINISHED,
  payload: { iid },
});

export const initWorkflowSuccessful = (workflows, initializedByName = false) => ({
  type: rexFlowActionTypes.INIT_WORKFLOW_SUCCESSFUL,
  payload: { workflows, initializedByName },
});

export const setWorkflowsFinished = (iids) => ({
  type: rexFlowActionTypes.SET_WORKFLOWS_FINISHED,
  payload: { iids },
});

export const resetTaskData = (iid) => ({
  type: rexFlowActionTypes.RESET_TASK_DATA,
  payload: { iid },
});

export const initWorkflowFailure = (error) => ({
  type: rexFlowActionTypes.INIT_WORKFLOW_FAILURE,
  payload: { error },
});

export const initWorkflowLoading = (isLoading) => ({
  type: rexFlowActionTypes.INIT_WORKFLOW_IS_LOADING,
  payload: { isLoading },
});

export const fetchTasksSuccess = (task, workflowId) => ({
  type: rexFlowActionTypes.FETCH_TASKS_SUCCESS,
  payload: { task, workflowId },
});

export const fetchTasksFailure = (error) => ({
  type: rexFlowActionTypes.FETCH_TASKS_FAILURE,
  payload: { error },
});

export const setFetchTasksIsLoading = (isLoading) => ({
  type: rexFlowActionTypes.FETCH_TASKS_IS_LOADING,
  payload: { isLoading },
});

export const setSaveTaskDataIsLoading = (taskId, isLoading) => ({
  type: rexFlowActionTypes.SAVE_TASK_DATA_IS_LOADING,
  payload: { taskId, isLoading },
});

export const setIsTaskCompleted = (taskId, isTaskCompleted) => ({
  type: rexFlowActionTypes.IS_TASK_COMPLETED,
  payload: { taskId, isTaskCompleted },
});

export const saveTaskDataFailure = (taskId, errors) => ({
  type: rexFlowActionTypes.SAVE_TASK_DATA_FAILURE,
  payload: { taskId, errors },
});

export const saveTaskDataException = (taskId, errorMessage) => ({
  type: rexFlowActionTypes.SAVE_TASK_DATA_EXCEPTION,
  payload: { taskId, errorMessage },
});

export const setDeploymentId = (deployments) => ({
  type: rexFlowActionTypes.SET_DEPLOYMENT_ID,
  payload: { deployments },
});

export const setIsFlexTaskActive = (isFlexTaskActive) => ({
  type: rexFlowActionTypes.SET_IS_FLEX_TASK_ACTIVE,
  payload: { isFlexTaskActive },
});

export const setIsATalkTrackBeingFetched = (isATalkTrackBeingFetched) => ({
  type: rexFlowActionTypes.SET_IS_TALK_TRACK_BEING_FETCHED,
  payload: { isATalkTrackBeingFetched },
});

export const setAvailableTalkTracks = (availableTalkTracks) => ({
  type: rexFlowActionTypes.SET_AVAILABLE_TALK_TRACKS,
  payload: { availableTalkTracks },
});

export const setIsFlexTaskAccepted = (isFlexTaskAccepted) => ({
  type: rexFlowActionTypes.SET_IS_FLEX_TASK_ACCEPTED,
  payload: { isFlexTaskAccepted },
});

export const setButtonState = (buttonName, buttonState) => ({
  type: rexFlowActionTypes.SET_BUTTONS_STATE,
  payload: { buttonName, buttonState },
});

export const setActiveTalkTrack = (activeTalkTrack) => ({
  type: rexFlowActionTypes.SET_ACTIVE_TALK_TRACK,
  payload: { activeTalkTrack },
});

export const deleteWorkflows = (canceledWorkflows) => ({
  type: rexFlowActionTypes.DELETE_WORKFLOWS,
  payload: { canceledWorkflows },
});

export const resetTasks = () => ({
  type: rexFlowActionTypes.RESET_TASKS
});
