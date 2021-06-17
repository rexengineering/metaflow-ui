import React from "react";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import Panel from "../Panel";

const useStyles = makeStyles((theme) => ({
  panel: {
    background: theme.palette.common.white,
    color: theme.palette.text.secondary,
    display: "flex",
  },
}));

function Pane({ children }) {
  const styles = useStyles();
  return <Panel className={styles.panel}>{children}</Panel>;
}

Pane.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Pane;
