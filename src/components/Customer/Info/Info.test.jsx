import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { MockedClientInfo, MockedUserTypes } from "./mockData";
import MockedManagerInfo from "./AccountManagerInfo/mockData";
import MockedNextStepsInfo from "./NextSteps/mockData";
import MockedNotesInfo from "./Notes/mockData";
import MockedTagsInfo from "./Tags/mockData";
import Info from "./Info";

describe("<Info />", () => {
  const renderInfoComponent = (onInfoSubmit = () => {}) => {
    return (
      <Info
        customerInfo={MockedClientInfo}
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
    const { container } = render(renderInfoComponent());
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
});
