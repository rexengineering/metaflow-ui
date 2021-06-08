import { render } from "@testing-library/react";
import { Formik } from "formik";
import React from "react";
import TaskPercentField from ".";

describe("<TaskPercentField />", () => {
  it("should render", () => {
    const { asFragment } = render(
      <Formik initialValues={{ field: "" }}>
        <TaskPercentField name="field" />
      </Formik>
    );
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(
      <Formik initialValues={{ field: "" }}>
        <TaskPercentField name="field" />
      </Formik>
    );
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });
});
