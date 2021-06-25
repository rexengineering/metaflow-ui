import React from "react";
import PropTypes from "prop-types";
import { Box, Divider, makeStyles, Typography } from "@material-ui/core";
import Task from "../Task";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.grey["800"],
    padding: theme.spacing(7, 2, 2),
    height: "100%",
  },
  title: {
    color: theme.palette.grey["300"],
    margin: theme.spacing(4, 0),
  },
  subtitle: {
    color: theme.palette.grey["400"],
  },
  divider: {
    backgroundColor: theme.palette.grey["400"],
  },
}));

function CallerInfo({ callerName }) {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Typography className={classes.subtitle} variant="body2">
        You are speaking with:
      </Typography>
      <Typography className={classes.title} variant="h3">
        {callerName}
      </Typography>
      <Divider className={classes.divider} />
      <Task submitButtonText="End Task" task={{}} />
    </Box>
  );
}

CallerInfo.propTypes = {
  callerName: PropTypes.string.isRequired,
};

export default CallerInfo;
