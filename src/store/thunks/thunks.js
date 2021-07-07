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
} from "../actions/rexflow";
import { getTasks, startWorkflow, finishTask } from "../queries/rexflow";
import { convertFormToQueryPayload } from "../../utils/tasks";
import { buildTaskIdentifier } from "../selectors/rexflow";
import {activateTalkTrack, getActiveTalkTracks, startTalkTrack} from "../queries/talktracks";
import {setTalkTracks} from "../actions/talktracks";

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

export const fetchActiveTalkTracks = () => async (dispatch) => {
  // const { data } = await apolloClient.query({
  //   query: getActiveTalkTracks
  // });

  const tt = [
    {
      "id": "test-123",
      "status": "ACTIVE",
      "order": 0,
      "talktrack_id": "test-123",
      "title": "Demo Talktrack",
      "steps": [
        {
          "step_id": "step-123",
          "title": "Step 1",
          "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pretium sem et nibh feugiat venenatis. Proin consectetur tempus urna, eu interdum massa consequat vitae. Vivamus a orci in purus elementum scelerisque ut eu magna. Nullam suscipit mollis dolor, sed interdum turpis sagittis vel. Nunc ultricies quam nec libero blandit faucibus. Sed turpis risus, tincidunt a vehicula sit amet, pellentesque eu neque. Nulla vel vulputate lectus, et rhoncus lacus.",
          "actions": [
            {
              "label": "Intro",
              "talktrack_id": "intro-123"
            }
          ]
        },
        {
          "step_id": "step-456",
          "title": "Step 2",
          "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pretium sem et nibh feugiat venenatis. Proin consectetur tempus urna, eu interdum massa consequat vitae. Vivamus a orci in purus elementum scelerisque ut eu magna. Nullam suscipit mollis dolor, sed interdum turpis sagittis vel. Nunc ultricies quam nec libero blandit faucibus. Sed turpis risus, tincidunt a vehicula sit amet, pellentesque eu neque. Nulla vel vulputate lectus, et rhoncus lacus.",
          "workflow_name": "capture_email",
          "actions": [
            {
              "label": "Intro",
              "talktrack_id": "intro-123"
            }
          ]
        }
      ]
    },
    {
      "id": "test-1rfedfv23",
      "status": "NOACTIVE",
      "order": 1,
      "talktrack_id": "test-46844",
      "title": "2 Talktrack",
      "steps": [
        {
          "step_id": "step-1234trr",
          "title": "Step 1",
          "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pretium sem et nibh feugiat venenatis. Proin consectetur tempus urna, eu interdum massa consequat vitae. Vivamus a orci in purus elementum scelerisque ut eu magna. Nullam suscipit mollis dolor, sed interdum turpis sagittis vel. Nunc ultricies quam nec libero blandit faucibus. Sed turpis risus, tincidunt a vehicula sit amet, pellentesque eu neque. Nulla vel vulputate lectus, et rhoncus lacus.",
          "actions": [
            {
              "label": "Intro",
              "talktrack_id": "intro-1treteg23"
            }
          ]
        },
        {
          "step_id": "step54t65tr-456",
          "title": "Step 2",
          "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pretium sem et nibh feugiat venenatis. Proin consectetur tempus urna, eu interdum massa consequat vitae. Vivamus a orci in purus elementum scelerisque ut eu magna. Nullam suscipit mollis dolor, sed interdum turpis sagittis vel. Nunc ultricies quam nec libero blandit faucibus. Sed turpis risus, tincidunt a vehicula sit amet, pellentesque eu neque. Nulla vel vulputate lectus, et rhoncus lacus.",
          "workflow_name": "capture_email",
          "actions": [
            {
              "label": "Intro",
              "talktrack_id": "intro-123"
            }
          ]
        }
      ]
    }
  ];

  // const { talktracks } = data;
  dispatch(setTalkTracks(tt));

}

export const initTalkTrack = (talkTrackId) => async (dispatch) => {
  await apolloClient.mutate({
    mutation: startTalkTrack,
    variables: {
      startTalkTrackInput: {
        talktrack_id: talkTrackId
      }
    }
  });

  dispatch(fetchActiveTalkTracks());
}

export const setTalkTrackActive = (talkTrackUUID) => async (dispatch) => {
  await apolloClient.mutate({
    mutation: activateTalkTrack,
    variables: {
      activateTalkTrackInput: {
        talktrack_uuid: talkTrackUUID
      }
    }
  });
  dispatch(fetchActiveTalkTracks());
}
