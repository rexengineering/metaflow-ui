import { combineReducers } from "redux";
import rexFlowReducer from "./rexflow";

const rootReducer = combineReducers({
  rexFlow: rexFlowReducer,
});

export default rootReducer;
