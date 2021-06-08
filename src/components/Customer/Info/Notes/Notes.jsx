import React from "react";
import PropTypes from "prop-types";
import InfoSection from "../InfoSection";
import ActionItem from "../../../ActionItem";
import { ActionItemDeleteType } from "../../../../constants";

function Notes({ notes, className, onAddIconClicked, onNoteDeleted }) {
  return (
    <InfoSection
      className={className}
      onAddIconClicked={onAddIconClicked}
      title="Notes"
    >
      {Array.isArray(notes) &&
        notes.map((note) => (
          <ActionItem
            label={note}
            actionType={ActionItemDeleteType}
            onAction={onNoteDeleted}
          />
        ))}
    </InfoSection>
  );
}

Notes.defaultProps = {
  className: "",
  onAddIconClicked: () => {},
  onNoteDeleted: () => {},
};

Notes.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  onAddIconClicked: PropTypes.func,
  onNoteDeleted: PropTypes.func,
};

export default Notes;
