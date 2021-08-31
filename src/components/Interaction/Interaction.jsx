import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Workflow from "../Workflow";

function Interaction({ identifier, isActive, instantiatedWorkflows }){
    if (!isActive)
        return null;
    return (
        <section>
            <p>This is {identifier} interaction</p>
            {
                Array.isArray(instantiatedWorkflows) && instantiatedWorkflows.map(({ name }) => (
                    <Workflow key={name} identifier={name}/>
                ))
            }
        </section>
        )
}

Interaction.propTypes = {
 identifier: PropTypes.string.isRequired,
 isActive: PropTypes.bool.isRequired,
}

const mapStateToProps = ( { rexFlow: { interactions } }, { identifier } ) => ({
    instantiatedWorkflows: interactions[identifier].workflows?.instantiated ?? []
});

export default connect(mapStateToProps)(Interaction);