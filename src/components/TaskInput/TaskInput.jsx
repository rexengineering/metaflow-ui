import { TextField } from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import { TaskTypes } from "../../constants";

function TaskInput({
  dataId,
  type,
  label,
  value,
  error,
  onChange,
  helperText,
}) {
  switch (type) {
    case TaskTypes.text: {
      return (
        <TextField
          label={label}
          variant="filled"
          name={dataId}
          value={value}
          onChange={onChange}
          error={error}
          helperText={helperText}
        />
      );
    }
    default:
      return null;
  }
}

TaskInput.defaultProps = {
  label: "",
  value: "",
  dataId: "",
  type: "",
  helperText: "",
  error: false,
  onChange: () => {},
};

TaskInput.propTypes = {
  dataId: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.bool,
  onChange: PropTypes.func,
  helperText: PropTypes.string,
  label: PropTypes.string,
};

export default TaskInput;
