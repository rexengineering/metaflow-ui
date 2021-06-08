import React from "react";
import { ButtonBase, makeStyles, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import fontAwesomeIcon from "../../../../utils/propsValidators";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1, 2),
    marginBottom: theme.spacing(2),
    width: "100%",
    justifyContent: "start",
  },
  info: {
    marginLeft: theme.spacing(2),
    textAlign: "left",
    marginBottom: theme.spacing(-1),
    color: theme.palette.common.white,
  },
  date: {
    marginTop: theme.spacing(-0.5),
    color: theme.palette.grey["400"],
  },
}));

function HistoryItem({ icon, label, date, onClick }) {
  const classes = useStyles();
  return (
    <ButtonBase className={classes.container} onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
      <div className={classes.info}>
        <Typography variant="body1">{label}</Typography>
        <Typography className={classes.date} variant="h6">
          {date}
        </Typography>
      </div>
    </ButtonBase>
  );
}

HistoryItem.propTypes = {
  icon: fontAwesomeIcon.isRequired,
  label: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default HistoryItem;
