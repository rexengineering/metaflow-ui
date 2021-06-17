import React, { useCallback } from "react";
import {
  makeStyles,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
} from "@material-ui/core";
import PropTypes from "prop-types";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/pro-light-svg-icons";
import fontAwesomeIcon from "../../utils/propsValidators";

const useStyles = makeStyles((theme) => ({
  nav: {
    width: theme.spacing(6.125),
  },
  drawer: {
    backgroundColor: "#333333",
  },
  logo: {
    display: "block",
    margin: theme.spacing(0, "auto"),
    padding: theme.spacing(2, 0),
    width: theme.spacing(3),
  },
  list: {
    marginTop: theme.spacing(10),
  },
}));

const useMenuItemStyles = makeStyles((theme) => ({
  icon: {
    justifyContent: "center",
    minWidth: 0,
  },
  activeItem: {
    color: theme.palette.primary.main,
  },
}));

function MenuItem({ icon, id, onClick, isActive }) {
  const classes = useMenuItemStyles();
  const onClickCb = useCallback(() => onClick(id), [onClick, id]);

  return (
    <ListItem button onClick={onClickCb} data-testid="menu-item">
      <ListItemIcon className={classes.icon}>
        <FontAwesomeIcon
          icon={icon}
          className={clsx(isActive && classes.activeItem)}
        />
      </ListItemIcon>
    </ListItem>
  );
}

MenuItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  icon: fontAwesomeIcon,
  isActive: PropTypes.bool,
};

MenuItem.defaultProps = {
  icon: faCircle,
  isActive: false,
};

function SideBar({ logo, menuItems, onMenuItemClicked, activeMenuItemId }) {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.nav}
      component="nav"
      open
      variant="persistent"
      classes={{ paper: classes.drawer }}
    >
      <img alt="Prism" src={logo} className={classes.logo} />
      <List className={classes.list}>
        {Array.isArray(menuItems) &&
          menuItems.map(({ id, icon }) => {
            return (
              <MenuItem
                key={id}
                onClick={onMenuItemClicked}
                id={id}
                icon={icon}
                isActive={id === activeMenuItemId}
              />
            );
          })}
      </List>
    </Drawer>
  );
}

SideBar.propTypes = {
  logo: PropTypes.string.isRequired,
  onMenuItemClicked: PropTypes.func.isRequired,
  activeMenuItemId: PropTypes.string.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      icon: fontAwesomeIcon,
    })
  ).isRequired,
};

export default SideBar;
