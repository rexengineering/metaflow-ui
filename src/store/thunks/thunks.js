import { ApolloClient, InMemoryCache } from "@apollo/client";
import {
  initWorkflowLoading,
  initWorkflowSuccessful,
  initWorkflowFailure,
  setSaveTaskDataIsLoading,
  saveTaskDataFailure,
  setIsTaskCompleted,
  fetchTasksSuccess,
  setFetchTasksIsLoading,
  fetchTasksFailure,
  saveTaskDataException,
  setIsATalkTrackBeingFetched,
  setAvailableTalkTracks,
  setButtonState,
  deleteWorkflows,
  setActiveTalkTrack, resetTasks,
} from "../actions";
import {
  getTasks,
  startWorkflow,
  finishTask,
  initWorkflowByName,
  getAvailableTalkTracks,
  cancelAllWorkflows
} from "../queries";
import {buildTaskIdentifier, convertFormToQueryPayload} from "../../utils/tasks";
import {InitialButtonState, LoadingButtonState, talkTrackIdentifierProp} from "../../constants";
import {callWorkflowDeployment, introWorkflowDeployment} from "../../utils/deployments";

const defaultOptions = {
  query: {
    fetchPolicy: "network-only",
  },
};

export const apolloClient = new ApolloClient({
  uri: "http://localhost/prism-api/query/",
  cache: new InMemoryCache(),
  defaultOptions,
});

const initDeployments = [callWorkflowDeployment, introWorkflowDeployment];
let areInitialized = false;
let setInitialTalkTrack = true;

export const fetchTasks = async (dispatch) => {
  try {

    const { data } = await apolloClient.query({
      query: getTasks,
    });

    const workflows = data.workflows.active;

    if (!workflows?.length && !areInitialized){
      areInitialized = true;
      initDeployments.forEach(async ({did, isTalkTrack}) => await initWorkflow(dispatch, did, isTalkTrack));
    }

    const mappedWorkflows = workflows.map(({ iid, metadata, name, did }) => {
      const isTalkTrack = metadata.find( ({key, value}) => key === "type" && value === "talktrack");
      return {
        iid,
        isTalkTrack: !!isTalkTrack,
        name,
        did
      }
    });

    const talkTracks = mappedWorkflows.filter(({ isTalkTrack }) => isTalkTrack);
    if (setInitialTalkTrack && talkTracks.length){
      const [ firstTalkTrack ] = talkTracks ?? [];
      const talkTrackIdentifier = firstTalkTrack[talkTrackIdentifierProp];
      dispatch(setActiveTalkTrack(talkTrackIdentifier ?? null ));
      setInitialTalkTrack = false;
    }

    dispatch(initWorkflowSuccessful(mappedWorkflows));
    workflows.forEach(({ iid, tasks }) => {
      const task = tasks[0];
      dispatch(fetchTasksSuccess(task, iid));
    });
  } catch (error) {
    dispatch(fetchTasksFailure({error})); // pending reducer change
  }
};

export const initWorkflow = async (dispatch, did, isTalkTrack, setAsActive = false) => {
  try {
    dispatch(initWorkflowLoading(true));
    const response = await apolloClient.mutate({
      mutation: startWorkflow,
      variables: {
        startWorkflowInput: {
          did,
        },
      },
    });
    const { data: { workflow: { start : { workflow: { iid, name } } } } } = response;
    dispatch(initWorkflowSuccessful([{iid, isTalkTrack, did, name}]));
    if (setAsActive){
      dispatch(setActiveTalkTrack(iid));
    }
  } catch (e) {
    dispatch(initWorkflowFailure({error: e}));
  }
  dispatch(initWorkflowLoading(false));
};

export const completeTask = async (dispatch, formFields, task) => {
  const data = convertFormToQueryPayload(formFields);
  const { tid, iid } = task;
  const taskIdentifier = buildTaskIdentifier(task);
  const tasksPayload = {
    tasks: [
      {
        tid,
        iid,
        data,
      },
    ],
  };
  dispatch( setButtonState(taskIdentifier, LoadingButtonState) );
  try {
    dispatch(setSaveTaskDataIsLoading(taskIdentifier, true));
    const result = await apolloClient.mutate({
      mutation: finishTask,
      variables: {
        completeTasksInput: tasksPayload,
      },
    });
    const { status, errors } = result?.data?.workflow?.tasks?.complete;
    if (status === "FAILURE") {
      dispatch(saveTaskDataFailure(taskIdentifier, errors));
    } else {
      dispatch(setIsTaskCompleted(taskIdentifier, true));
    }
  } catch (error) {
    dispatch(
      saveTaskDataException(taskIdentifier, "There was an unexpected error.")
    );
    dispatch(setIsTaskCompleted(taskIdentifier, false));
  }
  dispatch(setSaveTaskDataIsLoading(taskIdentifier, false));
  dispatch(setButtonState(taskIdentifier, InitialButtonState));
};

export const startWorkflowByName = async (dispatch, workflowName) => {
  dispatch( setIsATalkTrackBeingFetched(true) );
  dispatch( setButtonState(workflowName, LoadingButtonState) );
  try {
    const mutation = initWorkflowByName(workflowName);
    const result = await apolloClient.mutate({ mutation });
    const { data: { workflow: { startByName : { did, workflow: { iid, name } } } } } = result;
    if (!iid){
      throw new Error("Unable to init workflow");
    }
    dispatch(initWorkflowSuccessful([{iid, isTalkTrack: true, name, did}]));
  }catch (error){
    dispatch(initWorkflowFailure({error}));
  }
  dispatch( setIsATalkTrackBeingFetched(false) );
  dispatch( setButtonState(workflowName, InitialButtonState) );
}

export const fetchAvailableTalkTracks = async (dispatch) => {
  const { data } = await apolloClient.query({
    query: getAvailableTalkTracks
  });
  const { talktracks : { list } } = data ?? {};
  if (!Array.isArray(list)){
    dispatch(setAvailableTalkTracks([]));
    return;
  }
  const availableTalkTracks = list.map(({ name, deployments }) => {
    const [did] = deployments;
    return {
      name,
      did
    }
  });
  dispatch(setAvailableTalkTracks(availableTalkTracks));
};

export const cancelWorkflows = async (dispatch, activeWorkflows) => {
  if (!Array.isArray(activeWorkflows)) return;
  try {
    const workflows = activeWorkflows.map(({ iid }) => iid);
    const { data: { workflow: { cancel: { iid: canceledWorkflowsIds } } } } = await apolloClient.mutate({
      mutation: cancelAllWorkflows,
      variables: {
        cancelWorkflowInput: {
          iid: workflows,
        },
      },
    });
    const canceledWorkflows = activeWorkflows?.filter( currentActiveWorkflow => !canceledWorkflowsIds.includes(currentActiveWorkflow) );
    dispatch(deleteWorkflows(canceledWorkflows));
    dispatch(setActiveTalkTrack(null));
    dispatch(resetTasks());
    setInitialTalkTrack = true;
    areInitialized = false;
  }catch (error){
    console.log(error);
  }
};