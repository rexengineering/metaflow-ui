import {
  convertFormToQueryPayload,
  convertTaskFieldsToFormUtils,
} from "./tasks";

describe("Utils", () => {
  const formFields = {
    name: "Gabriel",
    last_name: "Lopez",
  };
  const formFieldsKeys = Object.keys(formFields);
  const fieldsAmount = formFieldsKeys.length;

  it("should convert saveTask query payload to formik and yup schemas", () => {
    const queryPayload = convertFormToQueryPayload(formFields);
    const { formikInitialValues } = convertTaskFieldsToFormUtils(queryPayload);
    const formikInitialValuesKeys = Object.keys(formikInitialValues);

    expect(formikInitialValuesKeys.length === fieldsAmount).toBeTruthy();
    formikInitialValuesKeys.forEach((formikField) =>
      expect(
        formikInitialValues[formikField] === formFields[formikField]
      ).toBeTruthy()
    );
    // Pending to add tests for validationSchema, this will be resolved on PRISM-116 PR
  });
});
