import React from "react";
import PropTypes from "prop-types";
import { Box, Divider, makeStyles, Typography } from "@material-ui/core";
import Workflow from "../Workflow";
import { connect } from "react-redux";

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
      marginBottom: theme.spacing(3),
  },
}));

function CallerInfo({ callerName, workflowID }) {
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
      <Workflow workflowID={workflowID} />
    </Box>
  );
}

CallerInfo.defaultProps = {
  callerName: "Unknown",
};

CallerInfo.propTypes = {
  callerName: PropTypes.string,
  workflowName: PropTypes.string.isRequired,
};

const mapStateToProps = (state, { workflowName }) => {
    const { activeWorkflows } = state?.rexFlow ?? { };
    const workflowID = "";
    if (!Array.isArray(activeWorkflows))
        return {
            workflowID
        };
    const activeWorkflowObject = activeWorkflows.find(({iid}) => iid.includes(workflowName));
    return {
        workflowID: activeWorkflowObject?.iid ?? ""
    }
};

export default connect(mapStateToProps)(CallerInfo);
