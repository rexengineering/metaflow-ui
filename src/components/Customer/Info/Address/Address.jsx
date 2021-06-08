import { Typography } from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import InfoSection from "../InfoSection";

function Address({ address, className }) {
  return (
    <InfoSection className={className} title="Address">
      <Typography variant="h6">{address}</Typography>
    </InfoSection>
  );
}

Address.defaultProps = {
  className: "",
};

Address.propTypes = {
  address: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Address;
