import React from "react";
import PropTypes from "prop-types";
import { Button, CircularProgress } from "@material-ui/core";

function ActionButton({ isLoading, ...props }) {
  // Eslint is disabled here since this is just a pass through for Button props
  // eslint-disable-next-line react/jsx-props-no-spreading
  return isLoading ? <CircularProgress size={50} /> : <Button {...props} />;
}

ActionButton.propTypes = {
  variant: PropTypes.string,
  color: PropTypes.string,
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

ActionButton.defaultProps = {
  variant: "contained",
  color: "primary",
  isLoading: false,
};

export default ActionButton;
