import React from "react";
import { CssBaseline, makeStyles } from "@material-ui/core";
import { Route, Switch, useHistory } from "react-router-dom";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import config from "../../constants/oktaConfig";
import Main from "../Main/Main";
import UserAuthentication from "../UserAuthentication/UserAuthentication";

const useStyles = makeStyles(() => ({
  app: {
    display: "flex",
    height: "100vh",
  },
}));

const oktaAuth = new OktaAuth(config.oidc);

function App() {
  const classes = useStyles();
  const history = useHistory();
  const restoreOriginalUri = async (okta, originalUri) => {
    history.replace(toRelativeUrl(originalUri ?? "", window.location.origin));
  };

  return (
    <div className={classes.app}>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <CssBaseline />
        There is stuff here.
        <UserAuthentication />
        <Switch>
          <Route path="/login/callback" component={LoginCallback} />
          <SecureRoute path="/" component={Main} />
        </Switch>
      </Security>
    </div>
  );
}

export default App;
