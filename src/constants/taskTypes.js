import { string, number, boolean } from "yup";

// Inputs
export const TEXT = "TEXT";
export const PHONE_NUMBER = "PHONE_NUMBER";
export const PERCENTAGE = "PERCENTAGE";
export const CURRENCY = "CURRENCY";
export const BOOLEAN = "BOOLEAN";
export const INTEGER = "INTEGER";
export const FLOAT = "FLOAT";

export function isInputType(field) {
  return [
    TEXT,
    PHONE_NUMBER,
    PERCENTAGE,
    CURRENCY,
    BOOLEAN,
    INTEGER,
    FLOAT,
  ].includes(field);
}

// Info
export const TABLE = "TABLE";
export const COPY = "COPY";

export function isInfoType(type) {
  return [TABLE, COPY].includes(type);
}

const numberValidationMessage = "Please enter a number";

export const validationSchemaMapping = {
  TEXT: string("Please enter a value"),
  PHONE_NUMBER: string("Please enter a value").length(10),
  PERCENTAGE: number(numberValidationMessage).typeError(
    numberValidationMessage
  ),
  CURRENCY: number(numberValidationMessage).typeError(numberValidationMessage),
  BOOLEAN: boolean(),
  INTEGER: number(numberValidationMessage)
    .typeError(numberValidationMessage)
    .integer(),
  FLOAT: number(numberValidationMessage).typeError(numberValidationMessage),
};

export default {
  TEXT,
  PHONE_NUMBER,
  PERCENTAGE,
  CURRENCY,
  BOOLEAN,
  INTEGER,
  FLOAT,
  TABLE,
  COPY,
};
