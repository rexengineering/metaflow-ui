import React from "react";
import PropTypes from "prop-types";
import InfoSection from "../InfoSection";
import ActionItem from "../../../ActionItem";
import { ActionItemCheckType } from "../../../../constants";

function NextSteps({
  nextSteps,
  className,
  onAddNextStepsButtonClicked,
  onNextStepsSelected,
}) {
  return (
    <InfoSection
      className={className}
      onAddIconClicked={onAddNextStepsButtonClicked}
      title="Next Steps"
    >
      {Array.isArray(nextSteps) &&
        nextSteps.map((nextStep) => (
          <ActionItem
            key={nextStep}
            label={nextStep}
            actionType={ActionItemCheckType}
            onAction={onNextStepsSelected}
          />
        ))}
    </InfoSection>
  );
}

NextSteps.defaultProps = {
  className: "",
};

NextSteps.propTypes = {
  nextSteps: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  onAddNextStepsButtonClicked: PropTypes.func.isRequired,
  onNextStepsSelected: PropTypes.func.isRequired,
};

export default NextSteps;
