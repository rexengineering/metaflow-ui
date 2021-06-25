import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useOktaAuth } from "@okta/okta-react";
import { useDispatch } from "react-redux";
import { setAccessToken, setIdToken } from "../../store/actions/oktaActions";

function UserAuthentication() {
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const { authState, oktaAuth } = useOktaAuth();
  const login = async () => {
    setErrorMessage("");
    try {
      await oktaAuth.signInWithRedirect();
    } catch (error) {
      console.log(error);
      setErrorMessage("There was an error signing you in.");
    }
  };

  const logout = async () => {
    setErrorMessage("");
    try {
      await oktaAuth.signOut();
    } catch (error) {
      console.log(error);
      setErrorMessage("There was an error signing you out.");
    }
  };

  const idToken = authState?.idToken?.idToken;
  const accessToken = authState?.accessToken?.accessToken;
  useEffect(() => {
    dispatch(setIdToken(idToken));
    dispatch(setAccessToken(accessToken));
  }, [dispatch, idToken, accessToken]);

  return (
    <div>
      {authState?.isAuthenticated ? (
        <Button onClick={logout}>Logout</Button>
      ) : (
        <Button onClick={login}>Login</Button>
      )}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
    </div>
  );
}

export default UserAuthentication;
