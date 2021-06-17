import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faCommentAlt } from "@fortawesome/pro-light-svg-icons";
import {
  CssBaseline,
  Button,
  makeStyles,
  Typography,
  Paper,
} from "@material-ui/core";
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
import PrettySkeleton from "./PrettySkeleton";

const useStyles = makeStyles((theme) => ({
  app: {
    display: "flex",
    height: "100vh",
  },
  tray1: {
    width: "30%",
    backgroundColor: theme.palette.grey[800],
    padding: theme.spacing(8, 3, 6),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "auto",
  },
  tray2: {
    padding: theme.spacing(3, 1.5, 3, 3),
    overflow: "auto",
  },
  tray3: {
    width: "60%",
    padding: theme.spacing(3, 3, 3, 1.5),
    overflow: "auto",
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
  paper: {
    padding: theme.spacing(2.5),
  },
  paperHeading: {
    marginBottom: theme.spacing(1.5),
    "&:last-child": {
      marginBottom: 0,
    },
  },
  deployment: {
    marginBottom: theme.spacing(2),
  },
  deploymentTitle: {
    marginBottom: theme.spacing(1),
  },
}));

function App() {
  const deployments = useSelector(selectDeployments);
  const activeWorkflows = useSelector(selectActiveWorkflows);
  const dispatch = useDispatch();
  const classes = useStyles();
  const areDeploymentsUnavailable =
    Array.isArray(deployments) && !deployments.length;
  const [isAutomaticState, setIsAutomaticState] = useState(true);

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
      <CssBaseline />
      <SideBar
        onMenuItemClicked={(item) => console.log("Menu item clicked: ", item)}
        logo="prism.svg"
        menuItems={[{ id: "1", isActive: true, icon: faCommentAlt }]}
        activeMenuItemId="1"
      />
      <Pane>
        <Tray className={classes.tray1}>
          <PrettySkeleton />
        </Tray>
        <Tray className={classes.tray2}>
          {(!Array.isArray(activeWorkflows) || !activeWorkflows.length) && (
            <Paper className={classes.paper}>
              <Typography>There are no active workflow instances</Typography>
            </Paper>
          )}
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
        <Tray className={classes.tray3}>
          <Paper className={classes.paper}>
            <Typography
              variant="h5"
              align="center"
              className={classes.leadingWrapper}
            >
              Initiate Workflows
            </Typography>
            {areDeploymentsUnavailable && (
              <Typography>There are no workflows available</Typography>
            )}
            {Array.isArray(deployments) &&
              deployments.map((deploymentID) => (
                <div key={deploymentID} className={classes.deployment}>
                  <Typography
                    variant="body2"
                    className={classes.deploymentTitle}
                  >
                    {deploymentID}
                  </Typography>
                  <WorkflowInstantiator deploymentID={deploymentID} />
                </div>
              ))}
          </Paper>
          <Paper className={classes.paper}>
            <Typography
              variant="h5"
              align="center"
              className={classes.leadingWrapper}
            >
              State Helpers
            </Typography>
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
          </Paper>
        </Tray>
      </Pane>
    </div>
  );
}

export default App;
