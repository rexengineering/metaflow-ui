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

export const fetchTasks = () => async (dispatch) => {
  try {
    dispatch(setFetchTasksIsLoading(true));
    const { data } = await apolloClient.query({
      query: getTasks,
    });
    const workflows = data.workflows.active;
    const workflowIDs = workflows.map(({ iid }) => iid);
    dispatch(initWorkflowSuccessful(workflowIDs));
    workflows.forEach(({ iid, tasks }) => {
      const task = tasks[0];
      dispatch(fetchTasksSuccess(task, iid));
    });
  } catch (e) {
    dispatch(fetchTasksFailure(e)); // pending reducer change
  }
  dispatch(setFetchTasksIsLoading(false));
};

export const initWorkflow = (did) => async (dispatch) => {
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
    dispatch(initWorkflowSuccessful(response.data.workflow.start.iid));
  } catch (e) {
    dispatch(initWorkflowFailure(e));
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
