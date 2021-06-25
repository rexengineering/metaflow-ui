import React from "react";
import { Box } from "@material-ui/core";
import PropTypes from "prop-types";

export function TabPanel({ children, value, index, className }) {
  return (
    <div className={className} hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.defaultProps = {
  className: "",
};

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default TabPanel;
