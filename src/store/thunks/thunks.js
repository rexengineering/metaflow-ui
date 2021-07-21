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
  saveTaskDataException,
} from "../actions";
import { getTasks, startWorkflow, finishTask } from "../queries";
import { convertFormToQueryPayload } from "../../utils/tasks";
import { buildTaskIdentifier } from "../selectors";

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

export const fetchTasks = (instanceID) => async (dispatch) => {
  try {
    dispatch(setFetchTasksIsLoading(true, instanceID));
    const { data } = await apolloClient.query({
      query: getTasks,
    });
    const workflows = data.workflows.active;
    const workflowIDs = workflows.map(({ iid }) => iid);
    dispatch(initWorkflowSuccessful(workflowIDs));
    workflows.forEach(({ iid, tasks }) => {
      const task = tasks[0];
      dispatch(fetchTasksSuccess(task, iid, instanceID));
    });
  } catch (e) {
    dispatch(fetchTasksFailure({error: e})); // pending reducer change
  }
  dispatch(setFetchTasksIsLoading(false, instanceID));
};

export const initWorkflow = (did, instanceID) => async (dispatch) => {
  try {
    dispatch(initWorkflowLoading(true, instanceID, did));
    const response = await apolloClient.mutate({
      mutation: startWorkflow,
      variables: {
        startWorkflowInput: {
          did,
        },
      },
    });
    dispatch(initWorkflowSuccessful(response.data.workflow.start.iid));
  } catch (e) {
    dispatch(initWorkflowFailure({error: e}));
  }
  dispatch(initWorkflowLoading(false, instanceID, did));
};

export const completeTask = (formFields, task, instanceID) => async (dispatch) => {
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
    dispatch(setSaveTaskDataIsLoading(taskIdentifier, true, instanceID));
    const result = await apolloClient.mutate({
      mutation: finishTask,
      variables: {
        completeTasksInput: tasksPayload,
      },
    });
    const { status, errors } = result?.data?.workflow?.tasks?.complete;
    if (status === "FAILURE") {
      dispatch(saveTaskDataFailure(taskIdentifier, errors, instanceID));
    } else {
      dispatch(setIsTaskCompleted(taskIdentifier, true, instanceID));
    }
  } catch (error) {
    dispatch(
      saveTaskDataException(taskIdentifier, "There was an unexpected error.", instanceID)
    );
    dispatch(setIsTaskCompleted(taskIdentifier, false, instanceID));
  }
  dispatch(setSaveTaskDataIsLoading(taskIdentifier, false, instanceID));
};
