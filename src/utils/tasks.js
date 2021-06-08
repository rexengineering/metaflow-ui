import * as yup from "yup";

export const convertFormToQueryPayload = (form) => {
  const fields = Object.keys(form);
  return fields.map((field) => {
    const data = form[field];
    return {
      dataId: field,
      data,
    };
  });
};

export const convertTaskFieldsToFormUtils = (fields = []) => {
  return fields.reduce((reducedFields, field) => {
    const { dataId, data } = field;
    const { formikInitialValues, validationSchema } = reducedFields;
    return {
      formikInitialValues: { ...formikInitialValues, [dataId]: data },
      validationSchema: {
        ...validationSchema,
        [dataId]: yup.string().required(),
      },
    };
  }, {});
};
