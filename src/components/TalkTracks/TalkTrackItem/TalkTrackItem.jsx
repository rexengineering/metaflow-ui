import React from "react";
import { Button, Chip, makeStyles, Paper, Typography } from "@material-ui/core";
import { talkTrackItemShape } from "../../../utils/shapes";

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
}));

function TalkTrackItem({ title, speech, actions, onInquirySelected, onSkip }) {
  const classes = useStyles();
  return (
    <Paper elevation={0} className={classes.paper}>
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
            {actions.map((action) => (
              <Chip
                key={action}
                className={classes.action}
                variant="outlined"
                onClick={() => onInquirySelected(action)}
                size="small"
                label={action}
              />
            ))}
          </section>
        </section>
      ) : null}
      <Button type="button" onClick={onSkip}>
        Skip
      </Button>
    </Paper>
  );
}

TalkTrackItem.defaultProps = {
  actions: [],
  onInquirySelected: () => {},
  active: false,
};

TalkTrackItem.propTypes = talkTrackItemShape;

export default TalkTrackItem;
