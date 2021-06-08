import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { object } from "yup";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import TaskInput from "../TaskInput";
import {
  selectIsTaskBeingProcessed,
  selectIsTaskCompleted,
} from "../../store/selectors";
import { completeTask } from "../../store/thunks";
import { convertTaskFieldsToFormUtils } from "../../utils/tasks";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

function Task({ className, task }) {
  const { data } = task;
  const dispatch = useDispatch();
  const {
    formikInitialValues,
    validationSchema,
  } = convertTaskFieldsToFormUtils(data);
  const [initialValues, setInitialValues] = useState(formikInitialValues ?? {});
  const formValidationSchema = object().shape(validationSchema);
  const isProcessing = useSelector(selectIsTaskBeingProcessed(task));
  const isCompleted = useSelector(selectIsTaskCompleted(task));
  const onSubmit = useCallback(
    (fields) => dispatch(completeTask(fields, task)),
    [dispatch, task]
  );
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: formValidationSchema,
    enableReinitialize: true,
  });
  const classes = useStyles();

  useEffect(() => {
    const formUtils = convertTaskFieldsToFormUtils(data);
    setInitialValues(formUtils.formikInitialValues ?? {});
  }, [data]);

  if (isCompleted) return <Typography>Form completed!</Typography>;

  if (isProcessing || !data?.length || !initialValues)
    return <CircularProgress size={25} />;

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={clsx(classes.form, className)}
    >
      {Array.isArray(data) &&
        data.map(({ dataId, label, type }) => {
          return (
            <TaskInput
              key={dataId}
              dataId={dataId}
              type={type}
              value={formik.values[dataId]}
              label={label}
              onChange={formik.handleChange}
              error={Boolean(formik.touched[dataId] && formik.errors[dataId])}
              helperText={formik.touched[dataId] && formik.errors[dataId]}
            />
          );
        })}
      <Button
        className={classes.submitButton}
        type="submit"
        variant="contained"
        color="secondary"
      >
        Submit
      </Button>
    </form>
  );
}

Task.defaultProps = {
  className: "",
  task: {},
};

Task.propTypes = {
  className: PropTypes.string,
  task: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        data: PropTypes.string,
        dataId: PropTypes.string.isRequired,
        encrypted: PropTypes.bool.isRequired,
        label: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        validators: PropTypes.arrayOf(
          PropTypes.shape({
            constraint: PropTypes.string,
            type: PropTypes.string.isRequired,
          })
        ),
      })
    ),
    iid: PropTypes.string,
    status: PropTypes.string,
    tid: PropTypes.string,
  }),
};

export default Task;
