import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import Task from "../Task";
import { selectTask } from "../../store/selectors";

function Workflow({ workflowID, instanceID, className }) {
  const task = useSelector(selectTask(workflowID, instanceID));

  return (
    <section>
      <Typography variant="h6">{workflowID}</Typography>
      {task && <Task className={className} task={task} instanceID={instanceID} />}
    </section>
  );
}

Workflow.propTypes = {
  className: PropTypes.string.isRequired,
  workflowID: PropTypes.string.isRequired,
  instanceID: PropTypes.string.isRequired,
};

export default Workflow;
