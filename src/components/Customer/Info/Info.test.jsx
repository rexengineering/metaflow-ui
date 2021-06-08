import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import React from "react";
import { MockedClientInfo, MockedUserTypes } from "./mockData";
import MockedManagerInfo from "./AccountManagerInfo/mockData";
import MockedNextStepsInfo from "./NextSteps/mockData";
import MockedNotesInfo from "./Notes/mockData";
import MockedTagsInfo from "./Tags/mockData";
import Info from "./Info";

describe("<Info />", () => {
  const renderInfoComponent = (
    customerInfo = MockedClientInfo,
    onInfoSubmit = () => {}
  ) => {
    const { name, type, email, phone, mobile } = customerInfo;
    return (
      <Info
        customerInfo={{ name, type, email, phone, mobile }}
        managerInfo={MockedManagerInfo}
        nextSteps={MockedNextStepsInfo}
        notes={MockedNotesInfo}
        tags={MockedTagsInfo}
        onSubmit={onInfoSubmit}
        userTypes={MockedUserTypes}
      />
    );
  };

  it("should render", () => {
    const { asFragment } = render(renderInfoComponent());
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(renderInfoComponent());
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should handle data change for form inputs properly", async () => {
    const { container } = render(renderInfoComponent("", "", "", "", ""));
    const nameInput = container.querySelector("[name='name']");
    const emailInput = container.querySelector("[name='email']");
    const phoneInput = container.querySelector("[name='phone']");
    const mobileInput = container.querySelector("[name='mobile']");

    await waitFor(() => {
      fireEvent.change(nameInput, { target: { value: MockedClientInfo.name } });
      fireEvent.change(emailInput, {
        target: { value: MockedClientInfo.email },
      });
      fireEvent.change(phoneInput, {
        target: { value: MockedClientInfo.phone },
      });
      fireEvent.change(mobileInput, {
        target: { value: MockedClientInfo.mobile },
      });
    });

    expect(nameInput.value).toBe(MockedClientInfo.name);
    expect(emailInput.value).toBe(MockedClientInfo.email);
    expect(phoneInput.value).toBe(MockedClientInfo.phone);
    expect(mobileInput.value).toBe(MockedClientInfo.mobile);
  });

  it("should display error messages properly", async () => {
    const name = "";
    const type = "";
    const email = "";
    const phone = "";
    const mobile = "";
    render(renderInfoComponent({ name, type, email, phone, mobile }));
    const submitButton = screen.getByText("Save");
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText("name is a required field")).toBeInTheDocument();
      expect(screen.getByText("phone is a required field")).toBeInTheDocument();
      expect(screen.getByText("email is a required field")).toBeInTheDocument();
      expect(
        screen.getByText("mobile is a required field")
      ).toBeInTheDocument();
    });
  });
});