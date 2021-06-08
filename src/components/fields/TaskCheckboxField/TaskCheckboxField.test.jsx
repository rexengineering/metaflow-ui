import { render, screen } from "@testing-library/react";
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
});
