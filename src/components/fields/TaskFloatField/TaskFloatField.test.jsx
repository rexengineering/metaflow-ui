import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Formik } from "formik";
import React from "react";
import TaskFloatField from ".";

describe("<TaskFloatField />", () => {
  it("should render", () => {
    const { asFragment } = render(
      <Formik initialValues={{ field: "" }}>
        <TaskFloatField name="field" />
      </Formik>
    );
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(
      <Formik initialValues={{ field: "" }}>
        <TaskFloatField name="field" />
      </Formik>
    );
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should validate on blur", async () => {
    const validateFn = jest.fn();
    const fieldName = "field";
    render(
      <Formik initialValues={{ [fieldName]: "" }}>
        <TaskFloatField
          name={fieldName}
          label="myLabel"
          validateFn={validateFn}
        />
      </Formik>
    );
    const input = screen.getByRole("textbox");

    fireEvent.blur(input);

    await waitFor(() => {
      expect(validateFn).toBeCalledTimes(1);
      expect(validateFn).toBeCalledWith(fieldName, "", expect.anything());
    });
  });

  it("should validate on change", async () => {
    const validateFn = jest.fn();
    const fieldName = "field";
    render(
      <Formik initialValues={{ [fieldName]: "" }}>
        <TaskFloatField
          name={fieldName}
          label="myLabel"
          validateFn={validateFn}
        />
      </Formik>
    );
    const input = screen.getByRole("textbox");

    userEvent.type(input, "123");

    await waitFor(() => {
      expect(validateFn).toBeCalledTimes(3);
      expect(validateFn).toHaveBeenNthCalledWith(
        3,
        fieldName,
        123,
        expect.anything()
      );
    });
  });

  it("should not accept characters", async () => {
    const fieldName = "field";
    render(
      <Formik initialValues={{ [fieldName]: "" }}>
        <TaskFloatField name={fieldName} label="myLabel" />
      </Formik>
    );
    const input = screen.getByRole("textbox");
    userEvent.type(input, "a1b2c3d");

    await waitFor(() => {
      expect(input).toHaveValue("123");
    });
  });
});
