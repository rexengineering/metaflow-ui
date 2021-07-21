import React from "react";
import PropTypes from "prop-types";
import {
  Card, CardContent, CardHeader, makeStyles, Typography,
} from "@material-ui/core";
import Workflow from "../Workflow";

const useStyles = makeStyles((theme) => ({
  workflow: {
    marginTop: theme.spacing(1),
    background: theme.palette.background.paper,
    padding: theme.spacing(2),
  },
}));

function TalkTracks({ talkTrackWorkflows, headerAction, instanceID }) {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader title="Talk Tracks" action={headerAction} />
      <CardContent>
        {(!Array.isArray(talkTrackWorkflows) || !talkTrackWorkflows.length) && (
          <Typography>There are no active talk tracks.</Typography>
        )}
        {Array.isArray(talkTrackWorkflows) &&
          talkTrackWorkflows.map((workflowID) => (
            <Workflow
              key={workflowID}
              className={classes.workflow}
              workflowID={workflowID}
              instanceID={instanceID}
            />
        ))}
      </CardContent>
    </Card>
  );
}

TalkTracks.propTypes = {
  talkTrackWorkflows: PropTypes.arrayOf(PropTypes.string).isRequired,
  headerAction: PropTypes.node,
  instanceID: PropTypes.string.isRequired,
};

TalkTracks.defaultProps = {
  headerAction: undefined,
};

export default TalkTracks;
