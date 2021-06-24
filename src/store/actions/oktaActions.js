export const oktaActions = {
  SET_ACCESS_TOKEN: "SET_ACCESS_TOKEN",
  SET_ID_TOKEN: "SET_ID_TOKEN",
};

export const setAccessToken = (token) => ({
  type: oktaActions.SET_ACCESS_TOKEN,
  token,
});

export const setIdToken = (token) => ({
  type: oktaActions.SET_ID_TOKEN,
  token,
});
