import React, { useCallback } from "react";
import PropTypes from "prop-types";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";
import { useField } from "formik";

const useStyles = makeStyles((theme) => ({
  label: {
    color: theme.palette.text.primary,
  },
}));

function TaskCheckboxField({ name, label, validateFn, ...passProps }) {
  const classes = useStyles();

  const [field, { error, touched }, { setValue, setTouched, setError }] =
    useField(name);

  const onChange = useCallback(
    (event) => {
      const value = event?.target?.checked;
      setValue(value);
      validateFn(name, value, setError);
    },
    [name, setValue, setError, validateFn]
  );

  const onBlur = useCallback(
    (event) => {
      const value = event?.target?.checked;
      setTouched(true);
      validateFn(name, value, setError);
    },
    [name, setTouched, setError, validateFn]
  );

  const isError = !!error && !!touched;

  return (
    <FormControl error={isError}>
      <FormControlLabel
        className={classes.label}
        label={label}
        control={
          <Checkbox
            // Disabled as this is a pass-through for MUI and Formik props
            /* eslint-disable react/jsx-props-no-spreading */
            {...passProps}
            {...field}
            onBlur={onBlur}
            onChange={onChange}
            /* eslint-enable react/jsx-props-no-spreading */
          />
        }
      />
      {isError && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}

TaskCheckboxField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  validateFn: PropTypes.func,
};

TaskCheckboxField.defaultProps = {
  label: undefined,
  validateFn: () => {},
};

export default TaskCheckboxField;
