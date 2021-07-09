import React from "react";
import { Button, Chip, makeStyles, Paper, Typography } from "@material-ui/core";
import { talkTrackItemShape } from "../../../utils/shapes";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  paper: {
    background: theme.palette.background.default,
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(1),
  },
  speech: {
    marginBottom: theme.spacing(2),
  },
  actions: {
    display: "flex",
    justifyContent: "left",
  },
  action: {
    margin: theme.spacing(0, 1, 2, 0),
    textTransform: "uppercase",
    lineHeight: 1,
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: theme.spacing(2),
  },
}));

function TalkTrackItem({ identifier, title, speech, actions, onActionSelected, onSkip, onContinue, className }) {
  const classes = useStyles();
  return (
    <Paper elevation={0} className={clsx(classes.paper, className)}>
      <Typography color="primary" className={classes.title} variant="body1">
        {title}
      </Typography>
      <Typography className={classes.speech} variant="body2">
        {speech}
      </Typography>

      {actions.length ? (
        <section>
          <Typography color="primary" className={classes.title} variant="body1">
            Select button based on customer inquiry
          </Typography>
          <section className={classes.actions}>
            {actions.map(({label, talktrackId}) => (
              <Chip
                key={`${label}-${talktrackId}`}
                className={classes.action}
                variant="outlined"
                onClick={() => onActionSelected(talktrackId)}
                size="small"
                label={label}
              />
            ))}
          </section>
        </section>
      ) : null}
      <section className={classes.buttons}>
        <Button type="button" onClick={() => onSkip(identifier)}>
          Skip
        </Button>
        <Button type="button" onClick={() => onContinue(identifier)}>
          Continue
        </Button>
      </section>
    </Paper>
  );
}

TalkTrackItem.defaultProps = {
  actions: [],
  onActionSelected: () => {},
  onContinue: () => {},
  active: false,
  className: "",
};

TalkTrackItem.propTypes = talkTrackItemShape;

export default TalkTrackItem;
