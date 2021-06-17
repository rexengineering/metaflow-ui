import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";

function TaskTypographyField({ data, variant }) {
  return <Typography variant={variant}>{data}</Typography>;
}

TaskTypographyField.propTypes = {
  data: PropTypes.string.isRequired,
  variant: PropTypes.string,
};

TaskTypographyField.defaultProps = {
  variant: "body1",
};

export default TaskTypographyField;
