import { saveTask, completeTask as completeTaskQuery } from "../queries";
import { apolloClient } from "./index";
import { buildTaskIdentifier, convertFormToQueryPayload } from "../../utils/tasks";

const completeTask = async (dispatch, formFields, task, persistent) => {

    const isPersistent = persistent === "true";
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

    // dispatch( setButtonState(taskIdentifier, LoadingButtonState) ); // Todo: Pending to add fetch state to task

    /// Merge all refactor stuff then start branching from there

    /*
    *
    * */

    try {

        const variables = isPersistent ? { saveTasksInput: tasksPayload } :  { completeTasksInput: tasksPayload }; // use only save qiery
        const mutation  = isPersistent ? saveTask : completeTaskQuery;
        const result = await apolloClient.mutate({
            mutation,
            variables,
        });
        const payloadResult = result?.data?.workflow?.tasks;
        const { status, errors } = isPersistent ? payloadResult?.save : payloadResult?.complete;
        const isTaskCompleted = status !== "FAILURE";
        if (!isTaskCompleted) {
            dispatch(saveTaskDataFailure(taskIdentifier, errors)); // fetch state failed - message
        }
        if (isTaskCompleted && !isPersistent){
            dispatch(resetWorkflowTask(iid)); // Todo: add <resetWorkflowTask> custom action
        }


        dispatch(setIsTaskCompleted(taskIdentifier, isTaskCompleted)); //  Todo: add <setIsTaskCompleted> custom action  -- replace it with remove task

    } catch (error) {
        dispatch(
            saveTaskDataException(taskIdentifier, "There was an unexpected error.") // fetch state failed - message
        );
    } finally {
        dispatch(setSaveTaskDataIsLoading(taskIdentifier, false)); // fetch state
        dispatch(setButtonState(taskIdentifier, InitialButtonState));
    }

};

export default completeTask;