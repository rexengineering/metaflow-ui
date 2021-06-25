import React from "react";
import { faCommentAlt } from "@fortawesome/pro-light-svg-icons";
import { CssBaseline, makeStyles } from "@material-ui/core";
import { Route, Switch, useHistory } from "react-router-dom";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import config from "../../constants/oktaConfig";
import Main from "../Main/Main";
import SideBar from "../../components/Sidebar";

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
        <SideBar
          onMenuItemClicked={(item) => console.log("Menu item clicked: ", item)}
          logo="prism.svg"
          menuItems={[{ id: "1", isActive: true, icon: faCommentAlt }]}
          activeMenuItemId="1"
        />
        <Switch>
          <Route path="/login/callback" component={LoginCallback} />
          <SecureRoute path="/" component={Main} />
        </Switch>
      </Security>
    </div>
  );
}

export default App;
