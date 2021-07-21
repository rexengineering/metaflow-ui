import React from "react";
import { Button,  makeStyles, Typography } from "@material-ui/core";
import WorkflowInstantiator from "../../components/WorkflowInstantiator";
import { fetchTasks } from "../../store/thunks/thunks";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  deployment: {
    marginBottom: theme.spacing(2),
  },
  deploymentTitle: {
    marginBottom: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(2),
    display: "block",
  },
}));

function DebugHelpers({ deployments, isAutomaticState, setIsAutomaticState, instanceID }) {
  const classes = useStyles();
  const isDeploymentsAvailable = Array.isArray(deployments) && !!deployments.length;
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <Typography variant="h5" align="center">
        Initiate Workflows
      </Typography>
      {!isDeploymentsAvailable && (
        <Typography>There are no workflows available</Typography>
      )}
      {Array.isArray(deployments) &&
        deployments.map((deploymentID) => (
          <div key={deploymentID} className={classes.deployment} data-testid="deployment">
            <Typography
              variant="body2"
              className={classes.deploymentTitle}
            >
              {deploymentID}
            </Typography>
            <WorkflowInstantiator deploymentID={deploymentID} instanceID={instanceID} />
          </div>
        ))}
      <Typography variant="h5" align="center">
        State Helpers
      </Typography>
      <Button
        color="secondary"
        type="button"
        variant="contained"
        onClick={() => dispatch(fetchTasks())}
        className={classes.button}
        data-testid="update-state-button"
      >
        Update state
      </Button>
      <Button
        variant="contained"
        type="button"
        onClick={(currentState) => setIsAutomaticState(!currentState)}
        className={classes.button}
        data-testid="toggle-state-button"
      >
        Toggle automatic state
      </Button>
      <Typography>
        Automatic state fetching is {isAutomaticState ? "On" : "Off"}
      </Typography>
    </div>
  );
}

export default DebugHelpers;
