import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Task from "../Task";

function Workflow({ task, submitButtonText, onTaskCompleted, className }) {
  return (
    <section>
      {task && <Task submitButtonText={submitButtonText} onTaskCompleted={onTaskCompleted} className={className} task={task} />}
    </section>
  );
}

Workflow.propTypes = {
  className: "",
  submitButtonText: undefined,
  onTaskCompleted: () => {},
};

Workflow.propTypes = {
  className: PropTypes.string,
  submitButtonText: PropTypes.string,
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
