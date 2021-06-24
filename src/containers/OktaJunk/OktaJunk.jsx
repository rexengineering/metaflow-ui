import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { useDispatch } from "react-redux";
import { setAccessToken, setIdToken } from "../../store/actions/oktaActions";

function OktaJunk() {
  const dispatch = useDispatch();
  const { authState, oktaAuth } = useOktaAuth();
  const login = async () => {
    try {
      await oktaAuth.signInWithRedirect();
    } catch (err) {
      console.log("Okta error: ", err);
    }
  };

  const logout = async () => {
    try {
      await oktaAuth.signOut();
    } catch (err) {
      console.log("Okta error: ", err);
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
      {authState?.isAuthenticated && <Button onClick={logout}>Logout</Button>}
      {!authState?.isPending && !authState?.isAuthenticated && (
        <Button onClick={login}>Login</Button>
      )}
      {authState?.isAuthenticated && <Link to="/home" />}
    </div>
  );
}

export default OktaJunk;
