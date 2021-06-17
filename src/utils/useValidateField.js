import { useCallback } from "react";

export const DEFAULT_ERROR_MESSAGE = "This field is invalid.";

function useValidateField(schema) {
  const validateField = useCallback(
    async (name, value, onFinish) => {
      try {
        await schema.validateAt(name, { [name]: value });
        onFinish();
      } catch (error) {
        onFinish(error?.message || DEFAULT_ERROR_MESSAGE);
      }
    },
    [schema]
  );

  return validateField;
}

export default useValidateField;
