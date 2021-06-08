import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Task from "../Task";
import { selectTask } from "../../store/selectors";

function Workflow({ workflowID, className }) {
  const task = useSelector(selectTask(workflowID));
  return <Task className={className} task={task} />;
}

Workflow.propTypes = {
  className: PropTypes.string.isRequired,
  workflowID: PropTypes.string.isRequired,
};

export default Workflow;
