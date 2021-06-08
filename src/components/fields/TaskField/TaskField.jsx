import React from "react";
import PropTypes from "prop-types";
import TASK_TYPES, { componentMapping } from "../../../constants/taskTypes";

function TaskField({ id, type, ...passProps }) {
  const Component = componentMapping[type];

  // Disabled as this is a pass-through for MUI and Formik props
  // eslint-disable-next-line react/jsx-props-no-spreading
  return Component ? <Component name={id} {...passProps} /> : null;
}

TaskField.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(TASK_TYPES)).isRequired,
};

export default TaskField;
