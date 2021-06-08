import { ButtonBase, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fontAwesomeIcon from "../../../utils/propsValidators";

const useMenuItemStyles = makeStyles((theme) => ({
  button: {
    width: "100%",
    height: theme.spacing(6),
  },
  icon: {
    width: "100% !important",
    fontSize: theme.spacing(3),
  },
  activeIcon: {
    boxShadow: `${theme.spacing(-0.5, 0)} ${theme.palette.primary.main} inset`,
  },
  inactiveIcon: {
    opacity: 0.3,
  },
}));

function MenuItem({ isActive, icon, onClick }) {
  const classes = useMenuItemStyles();
  const currentIconState = isActive ? classes.activeIcon : classes.inactiveIcon;
  return (
    <ButtonBase
      onClick={onClick}
      className={classes.button}
      disabled={!isActive}
    >
      <FontAwesomeIcon
        className={clsx(classes.icon, currentIconState)}
        icon={icon}
      />
    </ButtonBase>
  );
}

MenuItem.propTypes = {
  isActive: PropTypes.bool.isRequired,
  icon: fontAwesomeIcon.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MenuItem;
