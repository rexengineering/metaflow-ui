import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Task from "./Task";
import getStore from "../../store";
import { TEXT } from "../../constants/taskTypes";

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
});
