import fontAwesomeIcon from "./propsValidators";
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

  it("should validate fontawesome correctly", () => {
    const props = {
      icon: {
        icon: [],
        iconName: "faTrashAlt",
        prefix: "somePrefix",
      },
    };
    expect(fontAwesomeIcon(props, "icon", "Typography")).toBeUndefined();
  });

  it("should handle error validation for fontawesome icon correctly", () => {
    const props = {
      prop: {
        prefix: "somePrefix",
      },
    };
    expect(fontAwesomeIcon(props, "icon", "Typography")).toBeInstanceOf(Error);
  });

  it("should convert form fields to saveTask query payload", () => {
    const queryPayload = convertFormToQueryPayload(formFields);

    expect(queryPayload.length === fieldsAmount).toBeTruthy();

    queryPayload.forEach(({ data, dataId }) =>
      expect(formFields[dataId] === data).toBeTruthy()
    );
  });

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
