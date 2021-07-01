import { combineReducers } from "redux";
import rexFlowReducer from "./rexflow";
import talkTracksReducer from "./talktracks";

const rootReducer = combineReducers({
  rexFlow: rexFlowReducer,
  talkTracks: talkTracksReducer,
});

export default rootReducer;
