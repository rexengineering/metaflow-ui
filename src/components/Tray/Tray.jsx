import React from "react";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import clsx from "clsx";
import Panel from "../Panel";

const useStyles = makeStyles(() => ({
  panel: {
    width: "100%",
  },
}));

function Tray({ className, children }) {
  const styles = useStyles();
  return <Panel className={clsx(styles.panel, className)}>{children}</Panel>;
}

Tray.defaultProps = {
  className: "",
};

Tray.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Tray;
