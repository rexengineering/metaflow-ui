import React from "react";
import cancelWorkflow from "../../store/thunks/cancelWorkflow";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";

function Workflow({ identifier, interactionId, cancelWorkflow }){
 const handleCancelWorkflow = () => cancelWorkflow(interactionId, identifier );
 return (
     <section>
       <p>Workflow: {identifier}</p>
      <Button size="small" onClick={handleCancelWorkflow} color="primary">Cancel</Button>
     </section>
 );
}

const mapDispatchToProps = (dispatch) => ({
 cancelWorkflow: (interactionId, workflowId) => dispatch(cancelWorkflow(interactionId, workflowId)),
})

export default connect(undefined, mapDispatchToProps)(Workflow);