import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Notes from ".";

describe("<Notes />", () => {
  it("should render", () => {
    const { asFragment } = render(<Notes />);
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(<Notes />);
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should add notes", async () => {
    render(<Notes />);

    const notes = ["my note", "my note 2", "my note 3"];
    const addButton = screen.getByRole("button");
    const input = screen.getByRole("textbox");

    for (let i = 0; i < notes.length; i++) {
      userEvent.type(input, notes[i]);
      // Disabled as we want these promises to be fired
      // sequentially. Testing library does not support
      // overlapping waitFor calls.
      // eslint-disable-next-line no-await-in-loop
      await waitFor(async () => {
        userEvent.click(addButton);
      });
    }

    const noteElem = screen.getAllByTestId("note-message");
    expect(noteElem).toHaveLength(3);

    notes.forEach((note, index) => {
      expect(noteElem[index]).toHaveTextContent(note);
    });
  });

  it("should clear the input when adding a note", async () => {
    render(<Notes />);

    const note = "my note";
    const addButton = screen.getByRole("button");
    const input = screen.getByRole("textbox");

    userEvent.type(input, note);
    await waitFor(async () => {
      userEvent.click(addButton);
    });

    expect(input).toHaveValue("");
  });

  it("should delete a note", async () => {
    render(<Notes />);

    const notes = ["my note", "my note 2", "my note 3"];
    const addButton = screen.getByRole("button");
    const input = screen.getByRole("textbox");

    for (let i = 0; i < notes.length; i++) {
      userEvent.type(input, notes[i]);
      // Disabled as we want these promises to be fired
      // sequentially. Testing library does not support
      // overlapping waitFor calls.
      // eslint-disable-next-line no-await-in-loop
      await waitFor(async () => {
        userEvent.click(addButton);
      });
    }

    const buttons = screen.getAllByRole("button");
    await waitFor(() => userEvent.click(buttons[1]))

    const noteElem = screen.getAllByTestId("note-message");
    expect(noteElem).toHaveLength(2);
    expect(noteElem[0]).toHaveTextContent(notes[0]);
    expect(noteElem[1]).toHaveTextContent(notes[2]);
  });
});
