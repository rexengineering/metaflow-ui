import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { object } from "yup";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import TaskField from "../fields/TaskField";
import {
  selectExceptionError,
  selectIsTaskBeingProcessed,
  selectIsTaskCompleted,
  selectValidationErrors,
} from "../../store/selectors/rexflow";
import { completeTask } from "../../store/thunks/thunks";
import {
  convertTaskFieldsToFormUtils,
  convertValidationErrorsTo,
} from "../../utils/tasks";
import useValidateField from "../../utils/useValidateField";
import { isInfoType, isInputType } from "../../constants/taskTypes";

const useStyles = makeStyles((theme) => ({
  form: {
    padding: theme.spacing(1),
  },
  submitButton: {
    margin: theme.spacing(8, 0, 2),
    display: "block",
    clear: "both",
    color: theme.palette.primary.contrastText,
  },
  field: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  inProgressContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inProgressMessage: {
    marginLeft: theme.spacing(1),
  },
  infoField: {
    marginTop: theme.spacing(1),
  },
}));

function Task({ className, task, submitButtonText }) {
  const { data } = task;
  const dispatch = useDispatch();
  const { formikInitialValues, validationSchema } =
    convertTaskFieldsToFormUtils(data);
  const [initialValues, setInitialValues] = useState(formikInitialValues ?? {});
  const formValidationSchema = object().shape(validationSchema);
  const isProcessing = useSelector(selectIsTaskBeingProcessed(task));
  const isCompleted = useSelector(selectIsTaskCompleted(task));
  const exceptionError = useSelector(selectExceptionError(task));
  const onSubmit = useCallback(
    (fields) => dispatch(completeTask(fields, task)),
    [dispatch, task]
  );
  const validateField = useValidateField(formValidationSchema);
  const classes = useStyles();
  const errors = useSelector(selectValidationErrors(task));
  const { initialErrors, initialTouched } = convertValidationErrorsTo(
    errors ?? []
  );

  useEffect(() => {
    const formUtils = convertTaskFieldsToFormUtils(data);
    setInitialValues(formUtils.formikInitialValues ?? {});
  }, [data]);

  if (isCompleted) return <Typography>Talk track completed</Typography>;

  if (isProcessing || !data?.length || !initialValues) {
    return (
      <section className={classes.inProgressContainer}>
        <CircularProgress size={25} />
      </section>
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnBlur={false}
      validateOnChange={false}
      enableReinitialize
      className={className}
      initialErrors={initialErrors}
      initialTouched={initialTouched}
      validationSchema={formValidationSchema}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className={classes.form}>
          {Array.isArray(data) &&
            data.map((field) => {
              if (isInputType(field?.type)) {
                const { dataId, label, type } = field;
                return (
                  <div key={dataId} className={classes.field}>
                    <TaskField
                      type={type}
                      id={dataId}
                      label={label}
                      validateFn={validateField}
                    />
                  </div>
                );
              }
              if (isInfoType(field?.type)) {
                const { data: fieldData, type, variant, dataId, label } = field;
                return (
                  <div className={classes.infoField} key={fieldData}>
                    <TaskField id={dataId} type={type} label={label} data={fieldData} variant={variant} />
                  </div>
                );
              }
              return <></>;
            })}
          <Button
            className={classes.submitButton}
            type="submit"
            variant="contained"
            color="primary"
          >
            {submitButtonText}
          </Button>
          {exceptionError && (
            <Typography variant="body2" color="error">
              {exceptionError}
            </Typography>
          )}
        </form>
      )}
    </Formik>
  );
}

Task.defaultProps = {
  className: "",
  submitButtonText: "Submit",
  task: {},
};

Task.propTypes = {
  className: PropTypes.string,
  submitButtonText: PropTypes.string,
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
