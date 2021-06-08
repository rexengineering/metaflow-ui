import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Typography } from "@material-ui/core";
import Pane from "../../components/Pane";
import Tray from "../../components/Tray";
import { fetchTasks, getDeploymentId } from "../../store/thunks";
import {
  selectActiveWorkflows,
  selectDeployments,
} from "../../store/selectors";
import Workflow from "../../components/Workflow";
import WorkflowInstantiator from "../../components/WorkflowInstantiator";

const useStyles = makeStyles((theme) => ({
  app: {
    display: "flex",
    height: "100vh",
  },
  tray: {
    width: "20%",
  },
  tray3: {
    width: "60%",
  },
  workflow: {
    marginTop: theme.spacing(1),
    background: theme.palette.background.paper,
    padding: theme.spacing(2),
  },
}));

function App() {
  const deployments = useSelector(selectDeployments);
  const activeWorkflows = useSelector(selectActiveWorkflows);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => dispatch(getDeploymentId()), []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const interval = setInterval(() => dispatch(fetchTasks()), 5000);
    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={classes.app}>
      <Pane>
        <Tray className={classes.tray}>
          {Array.isArray(deployments) &&
            deployments.map((deploymentID) => (
              <WorkflowInstantiator deploymentID={deploymentID} />
            ))}
        </Tray>
        <Tray className={classes.tray}>
          <Typography>Tray 2</Typography>
        </Tray>
        <Tray className={classes.tray3}>
          <Typography>Tray 3</Typography>
          {Array.isArray(activeWorkflows) &&
            activeWorkflows.map((workflowID) => (
              <Workflow className={classes.workflow} workflowID={workflowID} />
            ))}
        </Tray>
      </Pane>
    </div>
  );
}

export default App;
