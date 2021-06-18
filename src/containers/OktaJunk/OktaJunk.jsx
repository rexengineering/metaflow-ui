import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

function OktaJunk() {
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
