import { oktaActions } from "../actions/oktaActions";

const INITIAL_STATE = {
  accessToken: undefined,
  idToken: undefined,
};

const oktaReducers = (state = INITIAL_STATE, { type, token }) => {
  switch (type) {
    case oktaActions.SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: token,
      };
    case oktaActions.SET_ID_TOKEN:
      return {
        ...state,
        idToken: token,
      };
    default:
      return state;
  }
};

export default oktaReducers;
