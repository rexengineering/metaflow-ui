import { render, screen } from "@testing-library/react";
import React from "react";
import notesData from "./mockData";
import Notes from ".";

describe("<Notes />", () => {
  const renderNotesComponent = () => {
    return <Notes notes={notesData} />;
  };

  it("should render", () => {
    const { asFragment } = render(renderNotesComponent());
    const initialRender = asFragment();

    expect(initialRender).not.toBeNull();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(renderNotesComponent());
    const initialRender = asFragment();

    expect(initialRender).toMatchSnapshot();
  });

  it("should render all passed notes", () => {
    render(renderNotesComponent());
    notesData.forEach((note) => {
      const noteNode = screen.getByText(note);
      expect(noteNode).toBeInTheDocument();
    });
  });
});
