export const talkTracksActionTypes = {
  SET_TALK_TRACKS: "SET_TALK_TRACKS",
};

export const setTalkTracks = (talkTracks) => ({
  type: talkTracksActionTypes.SET_TALK_TRACKS,
  payload: { talkTracks },
});
