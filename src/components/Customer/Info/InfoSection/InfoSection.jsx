import React from "react";
import PropTypes from "prop-types";
import { IconButton, makeStyles, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/pro-light-svg-icons/faPlusCircle";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    color: theme.palette.grey["400"],
  },
}));

function InfoSection({ title, onAddIconClicked, children, className }) {
  const classes = useStyles();

  return (
    <section className={className}>
      <div className={classes.header}>
        <Typography className={classes.label} variant="h6">
          {title}
        </Typography>
        {onAddIconClicked && (
          <IconButton onClick={onAddIconClicked}>
            <FontAwesomeIcon icon={faPlusCircle} />
          </IconButton>
        )}
      </div>
      <div>{children}</div>
    </section>
  );
}

InfoSection.defaultProps = {
  className: "",
  onAddIconClicked: null,
};

InfoSection.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  onAddIconClicked: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default InfoSection;
