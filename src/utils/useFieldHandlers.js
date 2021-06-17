import { useCallback } from "react";
import { parseFieldNumberValue } from "./tasks";

function useFieldHandlers({
  setValue,
  validateFn,
  name,
  setError,
  setTouched,
}) {
  return {
    onChange: useCallback(
      (event) => {
        const parsedValue = parseFieldNumberValue(event?.target?.rawValue);
        setValue(parsedValue);
        validateFn(name, parsedValue, setError);
      },
      [name, setError, setValue, validateFn]
    ),
    onBlur: useCallback(
      (event) => {
        const value = event?.target?.rawValue;
        setTouched(true);
        validateFn(name, value, setError);
      },
      [name, setError, setTouched, validateFn]
    ),
  };
}

export default useFieldHandlers;
