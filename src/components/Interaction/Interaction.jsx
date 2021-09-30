import React, {useContext} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Workflow from "../../rexui/components/Workflow";
import {Context} from "../../rexui/Context";

function Interaction({ identifier, isActive}){

    const {
        state: {
            interactions,
        }
    } = useContext(Context);

    const instantiatedWorkflows = interactions[identifier].workflows ?? [];

    if (!isActive)
        return null;
    return (
        <section>
            <p>This is {identifier} interaction</p>
            {
                Array.isArray(instantiatedWorkflows) && instantiatedWorkflows.map(({ requestId, iid }) => (
                    <Workflow key={requestId} identifier={iid} interactionId={identifier} />
                ))
            }
        </section>
        )
}

Interaction.propTypes = {
 identifier: PropTypes.string.isRequired,
 isActive: PropTypes.bool.isRequired,
}

export default Interaction;