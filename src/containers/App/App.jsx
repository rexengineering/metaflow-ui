import React from "react";
// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import { CssBaseline, makeStyles } from "@material-ui/core";
import { Route, Switch, useHistory } from "react-router-dom";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
// import { fetchTasks } from "../../store/thunks/thunks";
// import getDeploymentId from "../../store/thunks/getDeploymentId";
import config from "../../constants/oktaConfig";
import Main from "../Main/Main";
import OktaJunk from "../OktaJunk/OktaJunk";

const useStyles = makeStyles(() => ({
  app: {
    display: "flex",
    height: "100vh",
  },
}));

const oktaAuth = new OktaAuth(config.oidc);

function App() {
  // const dispatch = useDispatch();
  const classes = useStyles();
  // const [isAutomaticState] = useState(true);

  const history = useHistory();
  const restoreOriginalUri = async (okta, originalUri) => {
    history.replace(toRelativeUrl(originalUri ?? "", window.location.origin));
  };

  // useEffect(() => dispatch(getDeploymentId()), []); // eslint-disable-line react-hooks/exhaustive-deps
  //
  // useEffect(() => {
  //   if (isAutomaticState) {
  //     const interval = setInterval(() => dispatch(fetchTasks()), 500);
  //     return () => clearInterval(interval);
  //   }
  //   return () => {};
  // }, [isAutomaticState]); // eslint-disable-line react-hooks/exhaustive-deps

  /*
  <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Navbar {...{ setCorsErrorModalOpen }} />
      <CorsErrorModal {...{ corsErrorModalOpen, setCorsErrorModalOpen }} />
      <Container text style={{ marginTop: '7em' }}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login/callback" component={LoginCallback} />
          <SecureRoute path="/messages" component={Messages} />
          <SecureRoute path="/profile" component={Profile} />
        </Switch>
      </Container>
    </Security>
   */

  return (
    <div className={classes.app}>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <CssBaseline />
        There is stuff here.
        <OktaJunk />
        <Switch>
          <Route exact path="/" component={() => <div>Home</div>} />
          <Route path="/login/callback" component={LoginCallback} />
          <SecureRoute path="/home" component={Main} />
        </Switch>
      </Security>
    </div>
  );
}

export default App;
