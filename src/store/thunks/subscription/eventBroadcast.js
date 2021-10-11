import { apolloClient } from "../index";
import {eventBroadcastSubscription} from "../../subscriptions";
import {
    START_WORKFLOW,
    ERROR_BROADCAST,
    FINISH_BROADCAST,
    FINISH_TASK,
    FINISH_WORKFLOW,
    START_BROADCAST,
    START_TASK,
    UPDATE_TASK,
    UPDATE_WORKFLOW,
} from "../../../constants/subscriptionEvents";
import {
    addTask,
    removeInstantiatedWorkflow, removeTask,
    updateInstantiatedWorkflow, updateTask
} from "../../actions";
import { formatWorkflow } from "../../../utils/thunks";


const eventBroadcast = (dispatch) => {

  const subscriptionObserver = apolloClient.subscribe({
      query: eventBroadcastSubscription
  });

  subscriptionObserver.subscribe({
      next({ data }) {
        const { eventBroadcast: { event, data: eventData } } = data;
        switch (event) {

            case START_WORKFLOW: { // adding a new workflow here has no diff result
                /*const { workflow: { iid } } = eventData;
                dispatch(addNewInstantiatedWorkflow({ iid }));*/
                console.log(event);
                break;
            }

            case UPDATE_WORKFLOW:{
                const { workflow } = eventData;
                const formattedWorkflow = formatWorkflow(workflow);
                dispatch(updateInstantiatedWorkflow( formattedWorkflow, workflow.iid, 'iid' ));
                break;
            }

            case FINISH_WORKFLOW:{
                const { workflow } = eventData;
                const formattedWorkflow = formatWorkflow(workflow);
                dispatch(removeInstantiatedWorkflow(formattedWorkflow.iid));
                break;
            }

            case START_TASK:{
                const { task } = eventData;
                dispatch(addTask(task.iid, task));
                break;
            }
            case UPDATE_TASK:{
                const { task } = eventData;
                const { iid, tid } = task;
                dispatch( updateTask(iid, tid, task) );
                break;
            }
            case FINISH_TASK:{
                const { task } = eventData;
                const { iid, tid } = task;
                dispatch(removeTask(iid, tid));
                break;
            }

            case START_BROADCAST:{
                console.log(event);
                break;
            }
            case FINISH_BROADCAST:{
                console.log(event);
                break;
            }
            case ERROR_BROADCAST:{
                console.log(event);
                break;
            }

            default: {
                throw new Error("Broadcast event no supported!");
            }
        }
      }
  });
};



export default eventBroadcast;