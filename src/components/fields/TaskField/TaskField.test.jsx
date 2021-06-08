import React from "react";
import { render } from "@testing-library/react";
import TaskField from "./TaskField";
import {
  TEXT,
  BOOLEAN,
  CURRENCY,
  PHONE_NUMBER,
  PERCENTAGE,
} from "../../../constants/taskTypes";

jest.mock("../../../components/fields/TaskTextField", () => () => (
  <div data-testid="text-field" />
));
jest.mock("../../../components/fields/TaskPhoneField", () => () => (
  <div data-testid="phone-number-field" />
));
jest.mock("../../../components/fields/TaskPercentField", () => () => (
  <div data-testid="percent-field" />
));
jest.mock("../../../components/fields/TaskCurrencyField", () => () => (
  <div data-testid="currency-field" />
));
jest.mock("../../../components/fields/TaskCheckboxField", () => () => (
  <div data-testid="checkbox-field" />
));

describe("<TaskField />", () => {
  it("should render", () => {
    const { asFragment } = render(<TaskField type={TEXT} id="123" />);
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(<TaskField type={TEXT} id="123" />);
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should render a text field for text types", () => {
    const { getAllByTestId } = render(<TaskField type={TEXT} id="123" />);
    const textFields = getAllByTestId("text-field");
    expect(textFields.length).toBe(1);
  });

  it("should render a phone number field for phone number types", () => {
    const { getAllByTestId } = render(
      <TaskField type={PHONE_NUMBER} id="123" />
    );
    const textFields = getAllByTestId("phone-number-field");
    expect(textFields.length).toBe(1);
  });

  it("should render a percent field for percent types", () => {
    const { getAllByTestId } = render(<TaskField type={PERCENTAGE} id="123" />);
    const textFields = getAllByTestId("percent-field");
    expect(textFields.length).toBe(1);
  });

  it("should render a currency field for currency types", () => {
    const { getAllByTestId } = render(<TaskField type={CURRENCY} id="123" />);
    const textFields = getAllByTestId("currency-field");
    expect(textFields.length).toBe(1);
  });

  it("should render a checkbox field for boolean types", () => {
    const { getAllByTestId } = render(<TaskField type={BOOLEAN} id="123" />);
    const textFields = getAllByTestId("checkbox-field");
    expect(textFields.length).toBe(1);
  });

  it("should render nothing for an unknown type", () => {
    const { container } = render(<TaskField type="A_FAKE_TYPE" id="123" />);

    expect(container.firstChild).toBeNull();
  });
});
