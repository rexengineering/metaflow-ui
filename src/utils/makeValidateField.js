import { useCallback } from "react";

function useValidateField(schema) {
  const validateField = useCallback(
    async (name, value, onFinish) => {
      try {
        await schema.validateAt(name, { [name]: value });
        onFinish();
      } catch (error) {
        onFinish(error?.message ?? "This field is invalid.");
      }
    },
    [schema]
  );

  return validateField;
}

export default useValidateField;
