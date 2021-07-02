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
            data-testid="action-item"
            key={item}
            label={item}
            actionType={ActionItemDisplayOnlyType}
          />
        ))}
    </InfoSection>
  );
}

Tags.propTypes = {
  tagsItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAddTagsButtonClicked: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Tags.defaultProps = {
  className: "",
};

export default Tags;
