import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import Task from "../Task";
import { selectTask } from "../../store/selectors";

function Workflow({ workflowID, className }) {
  const task = useSelector(selectTask(workflowID));
  const { data } = task;
  return (
    <section>
      {Array.isArray(data) && data.length && (
        <Typography variant="body2">{workflowID}</Typography>
      )}
      <Task className={className} task={task} />
    </section>
  );
}

Workflow.propTypes = {
  className: PropTypes.string.isRequired,
  workflowID: PropTypes.string.isRequired,
};

export default Workflow;
