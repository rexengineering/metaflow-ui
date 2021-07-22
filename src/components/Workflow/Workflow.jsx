import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import Task from "../Task";
import { selectTask } from "../../store/selectors";

function Workflow({ workflowID, submitButtonText, className }) {
  const task = useSelector(selectTask(workflowID));
  return (
    <section>
      <Typography variant="h6">{workflowID}</Typography>
      {task && <Task submitButtonText={submitButtonText} className={className} task={task} />}
    </section>
  );
}

Workflow.propTypes = {
  className: "",
  submitButtonText: undefined,
};

Workflow.propTypes = {
  className: PropTypes.string,
  submitButtonText: PropTypes.string,
  workflowID: PropTypes.string.isRequired,
};

export default Workflow;
