import React from "react";
import PropTypes from "prop-types";
import {
    Card, CardContent, CardHeader, makeStyles, Typography,
} from "@material-ui/core";
import TalkTrack from "./TalkTrack/TalkTrack";
import TalkTrackSkeleton from "./TalkTrackSkeleton";

const useStyles = makeStyles(({spacing}) => ({
    card: {
        padding: spacing(2, 3.5, 0),
    },
}));

function TalkTracksWrapper({ talkTrackWorkflows, headerAction, activeTalkTrackID, isATalkTrackBeingFetched }) {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader className={classes.card} title="Talk Tracks" action={headerAction} />
      <CardContent>

        { !Array.isArray(talkTrackWorkflows) &&
            ( <TalkTrackSkeleton/> )
        }

        { ( Array.isArray(talkTrackWorkflows) && !talkTrackWorkflows.length ) &&
            ( <Typography>There are no active talk tracks.</Typography> )
        }

        { Array.isArray(talkTrackWorkflows) &&
          (
              <TalkTrack
                isATalkTrackBeingFetched={isATalkTrackBeingFetched}
                talkTrackItems={talkTrackWorkflows}
                activeTalkTrackID={activeTalkTrackID}
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
  isATalkTrackBeingFetched: PropTypes.bool.isRequired,
};

TalkTracksWrapper.defaultProps = {
  headerAction: undefined,
};

export default TalkTracksWrapper;
