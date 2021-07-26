import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "apollo-cache-inmemory";
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
  saveTaskDataException, setIsATalkTrackBeingFetched, setAvailableTalkTracks,
} from "../actions";
import {getTasks, startWorkflow, finishTask, initWorkflowByName, getAvailableTalkTracks} from "../queries";
import { convertFormToQueryPayload } from "../../utils/tasks";
import { buildTaskIdentifier } from "../selectors/rexflow";

const defaultOptions = {
  query: {
    fetchPolicy: "network-only",
  },
};

export const apolloClient = new ApolloClient({
  uri: "http://localhost:8000/query/",
  cache: new InMemoryCache(),
  defaultOptions,
});

export const fetchTasks = () => async (dispatch) => {
  try {
    dispatch(setFetchTasksIsLoading(true));
    const { data } = await apolloClient.query({
      query: getTasks,
    });
    const workflows = data.workflows.active;
    const mappedWorkflows = workflows.map(({ iid, metadata }) => {
      const isTalkTrack = metadata.find( ({key, value}) => key === "type" && value === "talktrack");
      return {
        iid,
        isTalkTrack: !!isTalkTrack
      }
    });
    dispatch(initWorkflowSuccessful(mappedWorkflows));
    workflows.forEach(({ iid, tasks }) => {
      const task = tasks[0];
      dispatch(fetchTasksSuccess(task, iid));
    });
  } catch (error) {
    dispatch(fetchTasksFailure({error})); // pending reducer change
  }
  dispatch(setFetchTasksIsLoading(false));
};

export const initWorkflow = (did, isTalkTrack) => async (dispatch) => {
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
    const iid = response?.data?.workflow?.start?.iid;
    dispatch(initWorkflowSuccessful({iid, isTalkTrack}));
  } catch (e) {
    dispatch(initWorkflowFailure({error: e}));
  }
  dispatch(initWorkflowLoading(false));
};

export const completeTask = (formFields, task) => async (dispatch) => {
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
};


export const startWorkflowByName = (workflowName) => async (dispatch) => {
  dispatch( setIsATalkTrackBeingFetched(true) );
  try {
    const mutation = initWorkflowByName(workflowName);
    const result = await apolloClient.mutate({ mutation });
    const iid = result?.data?.workflow?.startByName?.workflow?.iid;
    if (!iid){
      throw new Error("Unable to init workflow");
    }
    dispatch(initWorkflowSuccessful([{iid, isTalkTrack: true}]));
  }catch (error){
    dispatch(initWorkflowFailure({error}));
  }
  dispatch( setIsATalkTrackBeingFetched(false) );
}

export const fetchAvailableTalkTracks = () => async (dispatch) => {
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