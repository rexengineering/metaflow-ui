import React from "react";
import PropTypes from "prop-types";
import {
  Card, CardContent, CardHeader, makeStyles, Typography,
} from "@material-ui/core";
import TalkTrack from "./TalkTrack/TalkTrack";

const useStyles = makeStyles((theme) => ({
  workflow: {
    marginTop: theme.spacing(1),
    background: theme.palette.background.paper,
    padding: theme.spacing(2),
  },
}));

function TalkTracksWrapper({ talkTrackWorkflows, headerAction, onContinue, onSkip, activeTalkTrackID, onActionSelected, onTabChange}) {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader title="Talk Tracks" action={headerAction} />
      <CardContent>
        {(!Array.isArray(talkTrackWorkflows) || !talkTrackWorkflows.length) && (
          <Typography>There are no active talk tracks.</Typography>
        )}
        {Array.isArray(talkTrackWorkflows) &&
          (<TalkTrack
              onContinue={onContinue}
              onSkip={onSkip}
              talkTrackItems={talkTrackWorkflows}
              activeTalkTrackID={activeTalkTrackID}
              onActionSelected={onActionSelected}
              onTabChange={onTabChange}
              />
            )
        }
      </CardContent>
    </Card>
  );
}

TalkTracksWrapper.propTypes = {
  talkTrackWorkflows: PropTypes.arrayOf(PropTypes.string).isRequired,
  headerAction: PropTypes.node,
};

TalkTracksWrapper.defaultProps = {
  headerAction: undefined,
};

export default TalkTracksWrapper;
