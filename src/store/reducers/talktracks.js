import { talkTracksActionTypes } from "../actions/talktracks";

const INITIAL_STATE = {
  talkTracks: null,
};

const talkTracksReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case talkTracksActionTypes.SET_TALK_TRACKS: {
      const { talkTracks } = payload;
      return {
        ...state,
        talkTracks
      };
    }
    default:
      return state;
  }
};

export default talkTracksReducer;
