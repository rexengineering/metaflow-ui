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
        iid
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

export const finishTask = gql`
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
