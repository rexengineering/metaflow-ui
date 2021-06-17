import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, makeStyles, Typography } from "@material-ui/core";
import { faCommentAlt } from "@fortawesome/pro-light-svg-icons";
import Pane from "../../components/Pane";
import Tray from "../../components/Tray";
import { fetchTasks } from "../../store/thunks/thunks";
import getDeploymentId from "../../store/thunks/getDeploymentId";
import {
  selectActiveWorkflows,
  selectDeployments,
} from "../../store/selectors";
import Workflow from "../../components/Workflow";
import WorkflowInstantiator from "../../components/WorkflowInstantiator";
import ActionCard from "../../components/ActionCard";
import SideBar from "../../components/Sidebar";

const useStyles = makeStyles((theme) => ({
  app: {
    display: "flex",
    height: "100vh",
  },
  tray: {
    width: "30%",
  },
  tray3: {
    width: "60%",
  },
  workflow: {
    marginTop: theme.spacing(1),
    background: theme.palette.background.paper,
    padding: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
    display: "block",
  },
}));

function App() {
  const deployments = useSelector(selectDeployments);
  const activeWorkflows = useSelector(selectActiveWorkflows);
  const dispatch = useDispatch();
  const classes = useStyles();
  const areDeploymentsUnavailable =
    Array.isArray(deployments) && !deployments.length;
  const [isAutomaticState, setIsAutomaticState] = useState(false);

  useEffect(() => dispatch(getDeploymentId()), []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isAutomaticState) {
      const interval = setInterval(() => dispatch(fetchTasks()), 500);
      return () => clearInterval(interval);
    }
    return () => {};
  }, [isAutomaticState]); // eslint-disable-line react-hooks/exhaustive-deps

  if (areDeploymentsUnavailable)
    return <Typography>There are no deployments available</Typography>;

  return (
    <div className={classes.app}>
      <SideBar
        onMenuItemClicked={(item) => console.log("Menu item clicked: ", item)}
        logo="prism.svg"
        menuItems={[{ id: "1", isActive: true, icon: faCommentAlt }]}
        activeMenuItemId="1"
      />
      <Pane>
        <Tray className={classes.tray}>
          {Array.isArray(deployments) &&
            deployments.map((deploymentID) => (
              <WorkflowInstantiator
                key={deploymentID}
                deploymentID={deploymentID}
              />
            ))}
          <Button
            color="secondary"
            type="button"
            variant="contained"
            onClick={() => dispatch(fetchTasks())}
            className={classes.button}
          >
            Update state
          </Button>
          <Button
            variant="contained"
            type="button"
            onClick={() => setIsAutomaticState(!isAutomaticState)}
            className={classes.button}
          >
            Toggle automatic state
          </Button>
          <Typography>
            Automatic state fetching is {isAutomaticState ? "On" : "Off"}
          </Typography>
        </Tray>
        <Tray className={classes.tray}>
          <Typography>Tray 2</Typography>
        </Tray>
        <Tray className={classes.tray3}>
          <Typography>Tray 3</Typography>
          {Array.isArray(activeWorkflows) &&
            activeWorkflows.map((workflowID) => (
              <ActionCard className={classes.button} key={workflowID}>
                <Workflow
                  className={classes.workflow}
                  workflowID={workflowID}
                />
              </ActionCard>
            ))}
        </Tray>
      </Pane>
    </div>
  );
}

export default App;
