import { gql } from "@apollo/client";

export const startWorkflow = gql`
  mutation StartWorkflow($startWorkflowInput: StartWorkflowInput!) {
    workflow {
      start(input: $startWorkflowInput) {
        status
        iid
        workflow {
          iid
          did
          status
          name
        }
        errors {
          __typename
          ... on ProblemInterface {
            message
          }
        }
      }
    }
  }
`;

export const getAvailableDeployments = gql`
  query AvailableWorkflows {
    workflows {
      available {
        deployments
      }
    }
  }
`;

export const getTasks = gql`
  query GetTaskData {
    workflows {
      active {
        did
        iid
        name
        metadata {
          key
          value
        }
        tasks {
          iid
          tid
          status
          data {
            dataId
            type
            order
            label
            data
            encrypted
            validators {
              type
              constraint
            }
            variant
          }
        }
      }
    }
  }
`;

export const completeTask = gql`
  mutation CompleteTask($completeTasksInput: CompleteTasksInput!) {
    workflow {
      tasks {
        complete(input: $completeTasksInput) {
          status
          tasks {
            iid
            tid
            status
            data {
              dataId
              type
              order
              label
              data
              encrypted
              validators {
                type
                constraint
              }
            }
          }
          errors {
            __typename
            ... on ValidationProblem {
              message
              iid
              tid
              dataId
            }
          }
        }
      }
    }
  }
`;

export const saveTask = gql`
  mutation SaveTask($saveTasksInput: SaveTasksInput!) {
    workflow {
      tasks {
        save(input: $saveTasksInput) {
          status
          tasks {
            iid
            tid
            status
            data {
              dataId
              type
              order
              label
              data
              encrypted
              validators {
                type
                constraint
              }
            }
          }
          errors {
            __typename
            ... on ValidationProblem {
              message
              iid
              tid
              dataId
            }
          }
        }
      }
    }
  }
`;

export const initWorkflowByName = (workflowName) => gql`
  mutation StartByName {
    workflow {
      startByName (input: {name: "${workflowName}" }) {
        status
        did
        workflow {
          iid
          name
        }
      }
    }
  }
`;

export const getAvailableTalkTracks = gql`
  query Talktracks{
    talktracks {
      list {
        name
        deployments
      }
    }
  }
`;

export const cancelAllWorkflows = gql`
  mutation CancelWorkflow($cancelWorkflowInput: CancelWorkflowInput!) {
    workflow {
      cancel (input: $cancelWorkflowInput) {
        status
        iid
        errors {
          __typename
          ... on ProblemInterface {
            message
          }
        }
      }
    }
  }
`;
