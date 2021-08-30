import React from "react";
import PropTypes from "prop-types";

function Interaction({ identifier }){
    return <p>This is the {identifier} interaction!</p>
}

Interaction.propTypes = {
 identifier: PropTypes.string.isRequired,
}

export default Interaction;