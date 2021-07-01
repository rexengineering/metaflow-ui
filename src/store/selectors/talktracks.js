import { createSelector } from "reselect";

const talkTracksRootSelector = (state) => state.talkTracks;

export const selectTalkTracks = createSelector(
    [talkTracksRootSelector],
    ({ talkTracks }) => talkTracks
);
