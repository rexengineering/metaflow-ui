import { mutate } from "@apollo/client";
import {completeTask} from "./thunks";
import { rexFlowActionTypes } from "../actions";
import { handleResponse } from "../../utils/testThunks";
import { completeTaskResponse } from "../mockResponses";
import {buildTaskIdentifier} from "../selectors";

describe("completeTask", () => {

    it("should handle a successful request", () => {
        const completeTaskAPIResponse = completeTaskResponse("SUCCESS");
        mutate.mockReturnValueOnce(completeTaskAPIResponse);
        const task = {
            tid: "tid-89",
            iid: "iid-23"
        };
        const builtTaskIdentifier = buildTaskIdentifier(task);
        const formFields = [
            {
                name: "Gabriel",
            },
            {
                last_name: "Lopez",
            }
        ];
        const expectedActionsAndPayloads = [
            {
                type: rexFlowActionTypes.SAVE_TASK_DATA_IS_LOADING,
                payload: {
                    taskId: builtTaskIdentifier,
                    isLoading: true
                },
            },
            {
                type: rexFlowActionTypes.IS_TASK_COMPLETED,
                payload:  {
                    taskId: builtTaskIdentifier,
                    isTaskCompleted: true
                },
            },
            {
                type: rexFlowActionTypes.SAVE_TASK_DATA_IS_LOADING,
                payload: {
                    taskId: builtTaskIdentifier,
                    isLoading: false
                },
            },
        ];
        return handleResponse(completeTask, expectedActionsAndPayloads, formFields, task);
    });

});