export const error = {
  error: "There was an error",
  data: {},
};

export const getAvailableDeployments = {
  data: {
    workflows: {
      available: [
        {
          deployments: ["id1", "id2"],
        },
      ],
    },
  },
};

export const fetchTasksResponse = {
  data: {
    workflows: {
      active: [
        {
          iid: "iid1",
          metadata: [{
            key: "type",
            value: "talktrack"
          }],
          tasks: [{}],
        },
        {
          iid: "iid2",
          metadata: [{
            key: "ids_session",
            value: "anon"
          }],
          tasks: [{}],
        },
      ],
    },
  },
};
