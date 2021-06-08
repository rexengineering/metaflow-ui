import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";
import { useField } from "formik";
import CleaveInput from "../CleaveInput";
import { integerOptions } from "../../../constants/cleaveOptions";

function TaskIntegerField({ name, validateFn, ...passProps }) {
  const [field, { error, touched }, { setValue, setTouched, setError }] =
    useField(name);

  const onChange = useCallback(
    (event) => {
      const value = event?.target?.rawValue;
      setValue(value);
      validateFn(name, value, setError);
    },
    [name, setError, setValue, validateFn]
  );

  const onBlur = useCallback(
    (event) => {
      const value = event?.target?.rawValue;
      setTouched(true);
      validateFn(name, value, setError);
    },
    [name, setError, setTouched, validateFn]
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
      /* eslint-enable react/jsx-props-no-spreading */
      onBlur={onBlur}
      onChange={onChange}
      InputProps={{
        inputComponent: CleaveInput,
      }}
      // Casing makes these separate props but linters don't pick up on this
      // eslint-disable-next-line react/jsx-no-duplicate-props
      inputProps={{
        options: integerOptions,
      }}
    />
  );
}

TaskIntegerField.propTypes = {
  name: PropTypes.string.isRequired,
  validateFn: PropTypes.func,
};

TaskIntegerField.defaultProps = {
  validateFn: () => {},
};

export default TaskIntegerField;
