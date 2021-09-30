import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Task from "./Task";
import getStore from "../../store";
import { TEXT, COPY } from "../../constants/taskTypes";

describe("<Task />", () => {
  const props = {
    className: "",
    task: {
      iid: "SDT32ER64W",
      status: "UP",
      tid: "TERWT65756",
      data: [
        {
          data: "Gabriel",
          dataId: "name",
          encrypted: false,
          label: "Name",
          order: 1,
          type: TEXT,
          validators: [
            {
              constraint: "",
              type: "",
            },
          ],
        },
        {
          data: "some copy",
          dataId: "copy",
          encrypted: false,
          label: "Name",
          order: 2,
          type: COPY,
        },
      ],
    },
  };
  const renderTask = ({ className, task } = props, store = getStore({})) => (
    <Provider store={store}>
      <Task className={className} task={task} />
    </Provider>
  );

  it("should render", () => {
    const { asFragment } = render(renderTask());
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(renderTask());
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should render a submit button", () => {
    render(renderTask());
    const buttonNode = screen.getByText("Submit");
    expect(buttonNode).toBeInTheDocument();
  });

  it("should render copy text", () => {
    render(renderTask());
    const copyNode = screen.getByText("some copy");
    expect(copyNode).toBeInTheDocument();
  });
});
