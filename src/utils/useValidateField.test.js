import { object as yupObject, string as yupString } from "yup";
import testHook from "./testHook";
import useValidateField, { DEFAULT_ERROR_MESSAGE } from "./useValidateField";

const errorMessage = "error message";
const schema = yupObject().shape({
  name: yupString().required(errorMessage),
});

const poorSchema = yupObject().shape({
  name: yupString().required(""),
});

describe("useValidateField", () => {
  it("should return a function", () => {
    let validateField;
    testHook(() => {
      validateField = useValidateField(schema);
    });

    expect(validateField).toBeInstanceOf(Function);
  });

  it("should validate a good field", async () => {
    let validateField;
    testHook(() => {
      validateField = useValidateField(schema);
    });

    const onFinish = jest.fn();
    await validateField("name", "value", onFinish);

    expect(onFinish).toHaveBeenCalledWith();
  });

  it("should fail a bad field", async () => {
    let validateField;
    testHook(() => {
      validateField = useValidateField(schema);
    });

    const onFinish = jest.fn();
    await validateField("name", "", onFinish);

    expect(onFinish).toHaveBeenCalledWith(errorMessage);
  });

  it("should use the default validate message if one is not provided", async () => {
    let validateField;
    testHook(() => {
      validateField = useValidateField(poorSchema);
    });

    const onFinish = jest.fn();
    await validateField("name", "", onFinish);

    expect(onFinish).toHaveBeenCalledWith(DEFAULT_ERROR_MESSAGE);
  });
});
