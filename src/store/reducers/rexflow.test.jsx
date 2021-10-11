import rexFlowReducer, {INITIAL_WORKFLOW_STATE} from "./rexflow";
import {
    addNewInstantiatedWorkflow,
    addTask,
    removeTask,
    updateTask
} from "../actions";
import { v4 as generateUUID } from "uuid";

describe("Task Reducer", () => {

    const requestId = generateUUID();

    const mockState = () => {
        const instantiatedWorkflow = {
            ...INITIAL_WORKFLOW_STATE,
            requestId,
            iid: requestId,
            name: "exampleWorkflow"
        }
        return rexFlowReducer(undefined, addNewInstantiatedWorkflow(instantiatedWorkflow));
    };

    it("should update the state with a new task", () => {

        const data = "This is the new task";
        const task = { data };
        const state = mockState();
        const { instantiatedWorkflows } = rexFlowReducer(state, addTask(requestId, task));
        const [ workflow ] = instantiatedWorkflows;
        const [ updatedTask ] = workflow.tasks;

        expect(updatedTask.data === data).toBeTruthy();
    });

    it("should remove a task from the state", () => {
        const data = "This is the new task";
        const tid = "newTaskID";
        const taskInfo = { data, tid };
        const updatedState = rexFlowReducer(mockState(), addTask(requestId, taskInfo));
        const removedTaskState = rexFlowReducer(updatedState, removeTask(requestId, tid));
        const { instantiatedWorkflows } = removedTaskState;
        const [ workflow ] = instantiatedWorkflows;
        const { tasks } = workflow;
        expect(tasks.length === 0 ).toBeTruthy();
    });

    it("should update state with updated props", () => {
        const data = "This is the new task";
        const tid = "newTaskID";
        const info = "New information";
        const taskInfo = { data, tid };
        const state = rexFlowReducer(mockState(), addTask(requestId, taskInfo));
        const updatedTaskInfo = { data: [ info ], tid };
        const updatedState = rexFlowReducer(state, updateTask(requestId, tid, updatedTaskInfo));
        const { instantiatedWorkflows } = updatedState;
        const [ workflow ] = instantiatedWorkflows;
        const { tasks } = workflow;
        const [ task ] = tasks;
        const [ updatedInfo ] = task.data;

        expect( Array.isArray(task.data) ).toBeTruthy();
        expect( updatedInfo === info ).toBeTruthy();
    });

});
