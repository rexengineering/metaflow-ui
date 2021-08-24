import { ApolloClient, InMemoryCache } from "@apollo/client";
import {
  initWorkflowLoading,
  initWorkflowSuccessful,
  initWorkflowFailure,
  setSaveTaskDataIsLoading,
  saveTaskDataFailure,
  setIsTaskCompleted,
  fetchTasksSuccess,
  fetchTasksFailure,
  saveTaskDataException,
  setIsATalkTrackBeingFetched,
  setAvailableTalkTracks,
  setButtonState,
  deleteWorkflows,
  setActiveTalkTrack, resetTasks,
  resetWorkflowTask, setWorkflowsFinished,
} from "../actions";
import {
  getTasks,
  startWorkflow,
  completeTask as completeTaskQuery,
  initWorkflowByName,
  getAvailableTalkTracks,
  cancelAllWorkflows, saveTask
} from "../queries";
import {buildTaskIdentifier, convertFormToQueryPayload} from "../../utils/tasks";
import {InitialButtonState, LoadingButtonState, talkTrackIdentifierProp, talkTrackType} from "../../constants";
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
const getMetadata = (isTalkTrack) => {
  if(!isTalkTrack){
    return {};
  }
  return {
    type: "talktrack"
  }
};

export const fetchTasks = async (dispatch, activeWorkflows) => {
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

    const talkTracks = mappedWorkflows.filter(({ metadata }) => metadata?.type === talkTrackType);
    if (setInitialTalkTrack && talkTracks.length){
      const [ firstTalkTrack ] = talkTracks ?? [];
      const talkTrackIdentifier = firstTalkTrack[talkTrackIdentifierProp];
      dispatch(setActiveTalkTrack(talkTrackIdentifier ?? null ));
      setInitialTalkTrack = false;
    }

    dispatch(initWorkflowSuccessful(mappedWorkflows));


    if (Array.isArray(activeWorkflows)){
      const deletedWorkflows = activeWorkflows?.filter(({iid}) => !workflows.find(({iid: activeWFIID}) => activeWFIID === iid));
      dispatch(setWorkflowsFinished(deletedWorkflows.map(({ iid }) => iid)));
    }


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
    dispatch(initWorkflowSuccessful([{iid, metadata: getMetadata(isTalkTrack), did, name}]));
    if (setAsActive){
      dispatch(setActiveTalkTrack(iid));
    }
  } catch (e) {
    dispatch(initWorkflowFailure({error: e}));
  }
  dispatch(initWorkflowLoading(false));
};

export const completeTask = async (dispatch, formFields, task, persistent) => {
  const isPersistent = persistent === "true";
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
      const variables = isPersistent ? { saveTasksInput: tasksPayload } :  { completeTasksInput: tasksPayload };
      const mutation  = isPersistent ? saveTask : completeTaskQuery;
      const result = await apolloClient.mutate({
        mutation,
        variables,
      });
      const payloadResult = result?.data?.workflow?.tasks;
      const { status, errors } = isPersistent ? payloadResult?.save : payloadResult?.complete;
      const isTaskCompleted = status !== "FAILURE";
      if (!isTaskCompleted) {
        dispatch(saveTaskDataFailure(taskIdentifier, errors));
      }
      if (isTaskCompleted && !isPersistent){
        dispatch(resetWorkflowTask(iid));
      }
      dispatch(setIsTaskCompleted(taskIdentifier, isTaskCompleted));

  } catch (error) {
      dispatch(
        saveTaskDataException(taskIdentifier, "There was an unexpected error.")
      );
  } finally {
      dispatch(setSaveTaskDataIsLoading(taskIdentifier, false));
      dispatch(setButtonState(taskIdentifier, InitialButtonState));
  }

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
    dispatch(initWorkflowSuccessful([{iid, metadata: getMetadata(true), name, did}]));
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