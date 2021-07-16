import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Customer from "./index";
import { Months, CustomerHistory } from "./History/mockData";
import { MockedUserTypes, MockedClientInfo } from "./Info/mockData";
import ManagerInfo from "./Info/AccountManagerInfo/mockData";
import NextSeps from "./Info/NextSteps/mockData";
import Notes from "./Info/Notes/mockData";
import Tags from "./Info/Tags/mockData";

describe("<Customer />", () => {
  const renderCustomerComponent = (onTabsChange, onHistoryItemSelected = () => {}, onInfoSubmit = () => {}, ) => (
    <Customer
      months={Months}
      customerHistory={CustomerHistory}
      userTypes={MockedUserTypes}
      managerInfo={ManagerInfo}
      customerInfo={MockedClientInfo}
      nextSteps={NextSeps}
      notes={Notes}
      tags={Tags}
      onTabsChange={onTabsChange}
      onHistoryItemSelected={onHistoryItemSelected}
      onInfoSubmit={onInfoSubmit}
    />
  );

  it("should render", () => {
    const { asFragment } = render(renderCustomerComponent(() => {}));
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(renderCustomerComponent(() => {}));
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should handle tabs change event properly", () => {
    const handleTabChange = jest.fn();
    render(renderCustomerComponent(handleTabChange));
    const button = screen.getByRole("tab", { name: "History" });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(handleTabChange).toHaveBeenCalledTimes(1);
  });
});
