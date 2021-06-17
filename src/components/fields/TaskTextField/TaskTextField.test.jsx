import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Formik } from "formik";
import React from "react";
import TaskTextField from ".";

describe("<TaskTextField />", () => {
  it("should render", () => {
    const { asFragment } = render(
      <Formik initialValues={{ field: "" }}>
        <TaskTextField name="field" />
      </Formik>
    );
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(
      <Formik initialValues={{ field: "" }}>
        <TaskTextField name="field" />
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
        <TaskTextField
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
        <TaskTextField
          name={fieldName}
          label="myLabel"
          validateFn={validateFn}
        />
      </Formik>
    );
    const input = screen.getByRole("textbox");

    userEvent.type(input, "a1b2c3");

    await waitFor(() => {
      expect(validateFn).toBeCalledTimes(6);
      expect(validateFn).toHaveBeenNthCalledWith(
        6,
        fieldName,
        "a1b2c3",
        expect.anything()
      );
    });
  });
});
