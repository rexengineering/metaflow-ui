import React from "react";
import PropTypes from "prop-types";
import InfoSection from "../InfoSection";
import ActionItem from "../../../ActionItem";
import { ActionItemDisplayOnlyType } from "../../../../constants";

function Tags({ tagsItems, className, onAddTagsButtonClicked }) {
  return (
    <InfoSection
      className={className}
      onAddIconClicked={onAddTagsButtonClicked}
      title="Tags"
    >
      {Array.isArray(tagsItems) &&
        tagsItems.map((item) => (
          <ActionItem
            key={item}
            label={item}
            actionType={ActionItemDisplayOnlyType}
          />
        ))}
    </InfoSection>
  );
}

Tags.defaultProps = {
  className: "",
  onAddTagsButtonClicked: () => {},
};

Tags.propTypes = {
  tagsItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  onAddTagsButtonClicked: PropTypes.func,
};

export default Tags;
