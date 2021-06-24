import { combineReducers } from "redux";
import rexFlowReducer from "./rexflow";
import oktaReducers from "./oktaReducers";

const rootReducer = combineReducers({
  rexFlow: rexFlowReducer,
  okta: oktaReducers,
});

export default rootReducer;
