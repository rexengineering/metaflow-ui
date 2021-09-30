import { validationSchemaMapping } from "../constants/tasksTypes";

const mapBooleanToString = (booleanValue) => (booleanValue ? "True" : "False");

export const convertFormToQueryPayload = (form) => {
  const fields = Object.keys(form);
  return fields.map((field) => {
    const data = form[field];
    const isBoolean = typeof data === "boolean";
    return {
      dataId: field,
      data: isBoolean ? mapBooleanToString(data) : data.toString(),
    };
  });
};

export const buildTaskIdentifier = ({iid, tid}) => {
  if (!iid || !tid) {
    return "";
  }
  return `${iid}-${tid}`;
};

export const convertTaskFieldsToFormUtils = (fields = []) => {
  return fields.reduce((reducedFields, field) => {
    const { dataId, data, type } = field;
    const { formikInitialValues, validationSchema } = reducedFields;
    return {
      formikInitialValues: { ...formikInitialValues, [dataId]: data },
      validationSchema: {
        ...validationSchema,
        [dataId]: validationSchemaMapping[type],
      },
    };
  }, {});
};

export const convertValidationErrorsTo = (errors) => {
  const initialValues = {
    initialErrors: {},
    initialTouched: {},
  };
  if (!errors) return initialValues;
  return errors.reduce(
      ({ initialErrors, initialTouched }, { dataId, message }) => ({
        initialErrors: {
          ...initialErrors,
          [dataId]: message,
        },
        initialTouched: {
          ...initialTouched,
          [dataId]: true,
        },
      }),
      initialValues
  );
};