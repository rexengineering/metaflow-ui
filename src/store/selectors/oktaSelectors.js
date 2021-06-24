import { createSelector } from "reselect";

const oktaSelector = (state) => state.okta;

export const selectOktaAccessToken = createSelector(
  [oktaSelector],
  ({ accessToken }) => accessToken
);

export const selectOktaIdToken = createSelector(
  [oktaSelector],
  ({ idToken }) => idToken
);
