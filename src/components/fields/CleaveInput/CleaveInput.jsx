import React from "react";
import PropTypes from "prop-types";
import Cleave from "cleave.js/react";

function CleaveInput({ inputRef, ...passProps }) {
  // Disabled as this is a pass-through for Cleave props
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Cleave htmlRef={inputRef} {...passProps} />;
}

CleaveInput.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export default CleaveInput;
