import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Task from "../Task";

function Workflow({ task, submitButtonText, taskCompletedMessage, onTaskCompleted, className }) {
  return (
    <section>
      {task && <Task submitButtonText={submitButtonText} taskCompletedMessage={taskCompletedMessage} onTaskCompleted={onTaskCompleted} className={className} task={task} />}
    </section>
  );
}

Workflow.propTypes = {
  className: "",
  submitButtonText: undefined,
  taskCompletedMessage: undefined,
  onTaskCompleted: () => {},
};

Workflow.propTypes = {
  className: PropTypes.string,
  submitButtonText: PropTypes.string,
  taskCompletedMessage: PropTypes.string,
  workflowID: PropTypes.string.isRequired,
  onTaskCompleted: PropTypes.func,
};

const mapStateToProps = ( state, { workflowID }) => {
  const { tasks } = state?.rexFlow ?? {};
  return {
    task: !!tasks
        ? tasks[workflowID] ?? {}
        : {}
  };
};

export default connect(mapStateToProps)(Workflow);
