import { apolloClient } from "../index";
import { keepAliveMutation } from "../../subscriptions";
import {KEEP_ALIVE_SUCCESS} from "../../../constants/subscriptionEvents";


const keepAlive = () => async () => {

  try{

      const keepAliveResponse = await apolloClient.mutate({
          mutation: keepAliveMutation
      });

      const {
          data: {
              keepAlive: {
                  status
              }
          }
      } = keepAliveResponse;

      if (status !== KEEP_ALIVE_SUCCESS){
          throw new Error("There were an error trying to keep alive subscription socket");
      }

      // ToDo: dispatch something

  }catch (e) {
      // ToDo: handle error
  }

};



export default keepAlive;