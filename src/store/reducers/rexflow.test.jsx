import rexFlowReducer, {INITIAL_WORKFLOW_STATE} from "./rexflow";
import {
    addInteraction,
    addNewInstantiatedWorkflow,
    addTask,
    removeTask,
    updateInstantiatedWorkflow,
    updateTask
} from "../actions";
import { v4 as generateUUID } from "uuid";

describe("Task Reducer", () => {

    const interactionId = "184523659";
    const requestId = generateUUID();

    const mockState = () => {
      const stateWithInteraction = rexFlowReducer(undefined, addInteraction(interactionId));
      const stateWithWorkflow = rexFlowReducer(stateWithInteraction, addNewInstantiatedWorkflow(interactionId, requestId));
      const instantiatedWorkflow = {
          ...INITIAL_WORKFLOW_STATE,
          requestId,
          iid: requestId,
          name: "exampleWorkflow"
      }
      return  rexFlowReducer(stateWithWorkflow, updateInstantiatedWorkflow(interactionId, instantiatedWorkflow, requestId));
    };

    it("should update the state with a new task", () => {

        const data = "This is the new task";
        const task = { data };
        const state = mockState();
        const { interactions } = rexFlowReducer(state, addTask(interactionId, requestId, task));
        const { workflows } = interactions[interactionId];
        const [ workflow ] = workflows;
        const [ updatedTask ] = workflow.tasks;

        expect(updatedTask.data === data).toBeTruthy();
    });

    it("should remove a task from the state", () => {
        const data = "This is the new task";
        const tid = "newTaskID";
        const taskInfo = { data, tid };
        const updatedState = rexFlowReducer(mockState(), addTask(interactionId, requestId, taskInfo));
        const removedTaskState = rexFlowReducer(updatedState, removeTask(interactionId, requestId, tid));
        const { interactions } = removedTaskState;
        const { workflows } = interactions[interactionId];
        const [ workflow ] = workflows;
        const { tasks } = workflow;
        expect(tasks.length === 0 ).toBeTruthy();
    });

    it("should update state with updated props", () => {
        const data = "This is the new task";
        const tid = "newTaskID";
        const taskInfo = { data, tid };
        const state = rexFlowReducer(mockState(), addTask(interactionId, requestId, taskInfo));
        const info = "New information";
        const updatedTaskInfo = { data: [ info ], tid };
        const updatedState = rexFlowReducer(state, updateTask(interactionId, requestId, tid, updatedTaskInfo));
        const { interactions } = updatedState;
        const { workflows } = interactions[interactionId];
        const [ workflow ] = workflows;
        const { tasks } = workflow;
        const [ task ] = tasks;
        const [ updatedInfo ] = task.data;

        expect( Array.isArray(task.data) ).toBeTruthy();
        expect( updatedInfo === info ).toBeTruthy();
    });

});
