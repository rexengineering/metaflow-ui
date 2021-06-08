import React from "react";
import { render, screen } from "@testing-library/react";
import TaskInput from "./TaskInput";
import { TaskTypes } from "../../constants";

describe("<TaskInput />", () => {
  const renderTaskInput = (
    label = "Some label",
    value = "Hello",
    type = TaskTypes.text,
    dataId = "756756"
  ) => <TaskInput label={label} value={value} type={type} dataId={dataId} />;

  it("should render", () => {
    const { asFragment } = render(renderTaskInput());
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(renderTaskInput());
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should render a label", () => {
    const label = "Label!";
    render(renderTaskInput(label));
    const labelNode = screen.getByText(label);

    expect(labelNode).toBeInTheDocument();
  });

  it("should render a proper TaskInput control", () => {
    render(renderTaskInput());
    const textNode = screen.getByRole("textbox");
    expect(textNode).toBeInTheDocument();
  });
});
