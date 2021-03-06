import {validationSchemaMapping} from "../constants/taskTypes";

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

export const parseFieldNumberValue = (value) => {
  const parsedValue = Number.parseFloat(value);
  return Number.isNaN(parsedValue) ? null : parsedValue;
};

export const calculateWorkFlowNameFromDeploymentID = (dID) => {
  const words = dID.split("-");
  return words?.[0] ?? null;
};

export const buildTaskIdentifier = ({iid, tid}) => {
  if (!iid || !tid) {
    return "";
  }
  return `${iid}-${tid}`;
};

export const formatRawWorkflows = (workflows) => {
  return workflows.map(({ iid, metadata }) => {
    const isTalkTrack = metadata.find( ({key, value}) => key === "type" && value === "talktrack");
    return {
      iid,
      isTalkTrack: !!isTalkTrack
    }
  });
}
