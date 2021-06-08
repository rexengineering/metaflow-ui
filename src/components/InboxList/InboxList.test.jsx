import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";

import InboxList from "./InboxList";
import messageItems from "./mockData";

describe("<InboxList />", () => {
  const renderInboxItems = (onIboxItemSelected = () => {}) => (
    <InboxList
      onIboxItemSelected={onIboxItemSelected}
      messagesItems={messageItems}
    />
  );

  it("should render", () => {
    const { asFragment } = render(renderInboxItems());
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(renderInboxItems());
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should render all passed inbox items", () => {
    render(renderInboxItems());
    messageItems.forEach(({ cellphoneNumber }) =>
      expect(screen.getByText(cellphoneNumber)).toBeInTheDocument()
    );
  });

  it("should handle all click events properly", () => {
    const onIboxItemSelected = jest.fn();
    render(renderInboxItems(onIboxItemSelected));

    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      fireEvent.click(button);
    });
    expect(onIboxItemSelected).toHaveBeenCalledTimes(buttons.length);
  });
});
