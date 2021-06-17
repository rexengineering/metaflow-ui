import React from "react";
import PropTypes from "prop-types";
import { TextField, InputAdornment } from "@material-ui/core";
import { useField } from "formik";
import CleaveInput from "../CleaveInput";
import { percentOptions } from "../../../constants/cleaveOptions";
import useFieldHandlers from "../../../utils/useFieldHandlers";

function TaskPercentField({ name, validateFn, ...passProps }) {
  const [field, { error, touched }, { setValue, setTouched, setError }] =
    useField(name);
  const { onChange, onBlur } = useFieldHandlers({
    setValue,
    validateFn,
    name,
    setError,
    setTouched,
  });

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
        endAdornment: <InputAdornment position="end">%</InputAdornment>,
        inputComponent: CleaveInput,
      }}
      // Casing makes these separate props but linters don't pick up on this
      // eslint-disable-next-line react/jsx-no-duplicate-props
      inputProps={{
        options: percentOptions,
      }}
    />
  );
}

TaskPercentField.propTypes = {
  name: PropTypes.string.isRequired,
  validateFn: PropTypes.func,
};

TaskPercentField.defaultProps = {
  validateFn: () => {},
};

export default TaskPercentField;
