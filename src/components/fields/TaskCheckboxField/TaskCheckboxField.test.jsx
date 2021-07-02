import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Formik } from "formik";
import React from "react";
import TaskCheckboxField from ".";

describe("<TaskCheckboxField />", () => {
  it("should render", () => {
    const { asFragment } = render(
      <Formik initialValues={{ field: "" }}>
        <TaskCheckboxField name="field" />
      </Formik>
    );
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(
      <Formik initialValues={{ field: "" }}>
        <TaskCheckboxField name="field" />
      </Formik>
    );
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should render a label", () => {
    const label = "My label";
    render(
      <Formik initialValues={{ field: "" }}>
        <TaskCheckboxField name="field" label={label} />
      </Formik>
    );

    const child = screen.getByText(label);
    expect(child).toBeInTheDocument();
  });

  it("should validate on blur", async () => {
    const validateFn = jest.fn();
    const fieldName = "field";
    render(
      <Formik initialValues={{ [fieldName]: "" }}>
        <TaskCheckboxField
          name={fieldName}
          label="myLabel"
          validateFn={validateFn}
        />
      </Formik>
    );
    const input = screen.getByRole("checkbox");

    fireEvent.focusOut(input);

    await waitFor(() => {
      expect(validateFn).toBeCalledTimes(1);
      expect(validateFn).toBeCalledWith(fieldName, false, expect.anything());
    });
  });

  it("should validate on change", async () => {
    const validateFn = jest.fn();
    const fieldName = "field";
    render(
      <Formik initialValues={{ [fieldName]: "" }}>
        <TaskCheckboxField
          name={fieldName}
          label="myLabel"
          validateFn={validateFn}
        />
      </Formik>
    );
    const input = screen.getByRole("checkbox");

    fireEvent.click(input);

    await waitFor(() => {
      expect(validateFn).toBeCalledTimes(1);
      expect(validateFn).toBeCalledWith(fieldName, true, expect.anything());
    });
  });
});
