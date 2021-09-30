import React, {useContext} from "react";
import { Button } from "@material-ui/core";
import { Context } from "../../Context";

function Workflow({ identifier, interactionId }){

 const {
     thunks: {
        cancelWorkflow
     }
 } = useContext(Context);

 const handleCancelWorkflow = () => cancelWorkflow(interactionId, identifier );

 return (
     <section>
       <p>Workflow: {identifier}</p>
      <Button size="small" onClick={handleCancelWorkflow} color="primary">Cancel</Button>
     </section>
 );

}

export default Workflow;
