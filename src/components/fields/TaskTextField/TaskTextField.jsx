import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";
import { useField } from "formik";

function TaskTextField({ name, validateFn, ...passProps }) {
  const [
    { onChange: onChangeFormik, onBlur: onBlurFormik, ...field },
    { error, touched },
    { setError },
  ] = useField(name);

  const onChange = useCallback(
    (event) => {
      onChangeFormik(event);
      validateFn(name, event?.target?.value, setError);
    },
    [name, onChangeFormik, setError, validateFn]
  );

  const onBlur = useCallback(
    (event) => {
      onBlurFormik(event);
      validateFn(name, event?.target?.value, setError);
    },
    [name, onBlurFormik, setError, validateFn]
  );

  return (
    <TextField
      variant="filled"
      error={!!(touched && error)}
      helperText={touched && error}
      // Disabled as this is a pass-through for MUI and Formik props
      /* eslint-disable react/jsx-props-no-spreading */
      {...passProps}
      {...field}
      onChange={onChange}
      onBlur={onBlur}
      /* eslint-enable react/jsx-props-no-spreading */
    />
  );
}

TaskTextField.propTypes = {
  name: PropTypes.string.isRequired,
  validateFn: PropTypes.func,
};

TaskTextField.defaultProps = {
  validateFn: () => {},
};

export default TaskTextField;
