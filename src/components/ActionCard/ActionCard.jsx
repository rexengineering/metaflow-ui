import React from "react";
import PropTypes from "prop-types";
import { Card, makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "block",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
}));

function ActionCard({ children, className }) {
  const classes = useStyles();
  return <Card className={clsx(classes.card, className)}>{children}</Card>;
}

ActionCard.defaultProps = {
  className: "",
};

ActionCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default ActionCard;
