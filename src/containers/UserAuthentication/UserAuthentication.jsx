import React, { useEffect, useState } from "react";
import { IconButton, makeStyles, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useOktaAuth } from "@okta/okta-react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/pro-light-svg-icons";
import { setAccessToken, setIdToken } from "../../store/actions/oktaActions";

const useStyles = makeStyles((theme) => ({
  iconButton: {
    color: theme.palette.grey[700],
  },
}));

function UserAuthentication() {
  const classes = useStyles();
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
        <IconButton
          onClick={logout}
          className={classes.iconButton}
          aria-label="Log out"
          title="Log out"
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
        </IconButton>
      ) : (
        <IconButton
          onClick={login}
          className={classes.iconButton}
          aria-label="Log in"
          title="Log in"
        >
          <FontAwesomeIcon icon={faSignInAlt} />
        </IconButton>
      )}
      <Snackbar open={!!errorMessage} autoHideDuration={6000}>
        <Alert severity="success">{errorMessage}</Alert>
      </Snackbar>
    </div>
  );
}

export default UserAuthentication;
