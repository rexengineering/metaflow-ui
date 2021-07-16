import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import Task from "../Task";
import { selectTask } from "../../store/selectors/rexflow";

function Workflow({ workflowID, className }) {
  const task = useSelector(selectTask(workflowID));

  return (
    <section>
      <Typography variant="h6">{workflowID}</Typography>
      {task && <Task className={className} task={task} />}
    </section>
  );
}

Workflow.defaultProps = {
  className: "",
}

Workflow.propTypes = {
  className: PropTypes.string,
  workflowID: PropTypes.string.isRequired,
};

export default Workflow;
