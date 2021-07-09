import PropTypes from "prop-types";

export const customerInfoShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  mobile: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
});

export const managerInfoShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  onTransferCallClick: PropTypes.func.isRequired,
});

export const nextStepsShape = PropTypes.arrayOf(PropTypes.string);

export const notesShape = PropTypes.arrayOf(PropTypes.string);

export const tagsShape = PropTypes.arrayOf(PropTypes.string);

export const userTypesShape = PropTypes.arrayOf(
  PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })
);

export const talkTrackItemShape = {
  identifier: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  currentStep: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(PropTypes.shape({
    speech: PropTypes.string.isRequired,
    actions: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      talktrack_id: PropTypes.string,
    })),
    title: PropTypes.string.isRequired,
    order: PropTypes.number.isRequired,
    workflowName: PropTypes.string,
  })),
  onActionSelected: PropTypes.func,
  onSkip: PropTypes.func,
  onContinue: PropTypes.func,
  className: PropTypes.string,
};
