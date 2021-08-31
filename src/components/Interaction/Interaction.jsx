import React from "react";
import PropTypes from "prop-types";

function Interaction({ identifier, isActive }){
    return isActive
            ? <p>This is the {identifier} interaction!</p>
            : null;
}

Interaction.propTypes = {
 identifier: PropTypes.string.isRequired,
 isActive: PropTypes.bool.isRequired,
}

export default Interaction;