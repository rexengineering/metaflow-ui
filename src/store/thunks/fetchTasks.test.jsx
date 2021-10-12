import { query } from "@apollo/client";
import {error, fetchTasksResponse} from "../mockResponses";
import {fetchTasks} from "./thunks";
import { rexFlowActionTypes } from "../actions";
import {formatRawWorkflows} from "../../utils/tasks";
import {handleResponse} from "../../utils/testThunks";

describe("fetchTasks", () => {

    it("should handle a successful request", () => {
        query.mockReturnValueOnce(fetchTasksResponse);
        const workflows = fetchTasksResponse.data.workflows.active;
        const [ firstWorkflow, secondWorkflow ] = workflows;
        const expectedActionsAndPayloads = [
            {
                type: rexFlowActionTypes.FETCH_TASKS_IS_LOADING,
                payload: {
                    isLoading: true
                },
            },
            {
                type: rexFlowActionTypes.INIT_WORKFLOW_SUCCESSFUL,
                payload: {
                    workflows: formatRawWorkflows(workflows),
                },
            },
            {
                type: rexFlowActionTypes.FETCH_TASKS_SUCCESS,
                payload: { workflowId: firstWorkflow.iid, task: firstWorkflow.tasks[0] },
            },
            {
                type: rexFlowActionTypes.FETCH_TASKS_SUCCESS,
                payload: { workflowId: secondWorkflow.iid, task: secondWorkflow.tasks[0] },
            },
            {
                type: rexFlowActionTypes.FETCH_TASKS_IS_LOADING,
                payload:  {
                    isLoading: false
                },
            },
        ];
        return handleResponse(fetchTasks, expectedActionsAndPayloads);
    });

    it("should handle an unexpected error properly", () => {
        query.mockReturnValueOnce(error);
        const expectedActionsAndPayloads = [
            {
                type: rexFlowActionTypes.FETCH_TASKS_IS_LOADING,
                payload: {
                    isLoading: true
                },
            },
            {
                type: rexFlowActionTypes.FETCH_TASKS_FAILURE,
                payload: { error: "There was an unexpected error" },
            },
            {
                type: rexFlowActionTypes.FETCH_TASKS_IS_LOADING,
                payload:  {
                    isLoading: false
                },
            },
        ];
        return handleResponse(fetchTasks, expectedActionsAndPayloads);
    });


});
