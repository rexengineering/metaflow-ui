import { string, number, boolean } from "yup";
import TaskTextField from "../components/fields/TaskTextField";
import TaskPhoneField from "../components/fields/TaskPhoneField";
import TaskPercentField from "../components/fields/TaskPercentField";
import TaskCurrencyField from "../components/fields/TaskCurrencyField";
import TaskCheckboxField from "../components/fields/TaskCheckboxField";
import TaskIntegerField from "../components/fields/TaskIntegerField";
import TaskFloatField from "../components/fields/TaskFloatField";
import TaskTableField from "../components/fields/TaskTableField";
import TaskTypographyField from "../components/fields/TaskTypographyField";

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

export const componentMapping = {
  TEXT: TaskTextField,
  PHONE_NUMBER: TaskPhoneField,
  PERCENTAGE: TaskPercentField,
  CURRENCY: TaskCurrencyField,
  BOOLEAN: TaskCheckboxField,
  INTEGER: TaskIntegerField,
  FLOAT: TaskFloatField,
  TABLE: TaskTableField,
  COPY: TaskTypographyField,
};

export const validationSchemaMapping = {
  TEXT: string(),
  PHONE_NUMBER: string().length(10),
  PERCENTAGE: number(),
  CURRENCY: number(),
  BOOLEAN: boolean(),
  INTEGER: number().integer(),
  FLOAT: number(),
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
