import React from "react";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
  },
}));

function Panel({ className, children }) {
  const styles = useStyles();
  return (
    <section className={clsx(styles.container, className)}>{children}</section>
  );
}

Panel.defaultProps = {
  className: "",
};

Panel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Panel;