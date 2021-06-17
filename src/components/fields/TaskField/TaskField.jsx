import React from "react";
import PropTypes from "prop-types";
import TASK_TYPES, {
  TEXT,
  PHONE_NUMBER,
  PERCENTAGE,
  CURRENCY,
  BOOLEAN,
  INTEGER,
  FLOAT,
  TABLE,
  COPY,
} from "../../../constants/taskTypes";
import TaskTextField from "../TaskTextField";
import TaskPhoneField from "../TaskPhoneField";
import TaskPercentField from "../TaskPercentField";
import TaskCurrencyField from "../TaskCurrencyField";
import TaskCheckboxField from "../TaskCheckboxField";
import TaskIntegerField from "../TaskIntegerField";
import TaskFloatField from "../TaskFloatField";
import TaskTableField from "../TaskTableField";
import TaskTypographyField from "../TaskTypographyField";

export const componentMapping = {
  [TEXT]: TaskTextField,
  [PHONE_NUMBER]: TaskPhoneField,
  [PERCENTAGE]: TaskPercentField,
  [CURRENCY]: TaskCurrencyField,
  [BOOLEAN]: TaskCheckboxField,
  [INTEGER]: TaskIntegerField,
  [FLOAT]: TaskFloatField,
  [TABLE]: TaskTableField,
  [COPY]: TaskTypographyField,
};

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
