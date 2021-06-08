import { makeStyles } from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import MenuItem from "./MenuItem";

const useStyles = makeStyles((theme) => ({
  nav: {
    background: theme.palette.background.default,
    width: "100%",
    paddingTop: theme.spacing(1.5),
  },
  logo: {
    display: "block",
    margin: theme.spacing(0, "auto"),
  },
  menuItems: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
}));

function SideBar({ logo, menuItems, onMenuItemClicked }) {
  const styles = useStyles();
  return (
    <nav className={styles.nav}>
      <img alt="Prism" src={logo} className={styles.logo} />
      <section className={styles.menuItems}>
        {Array.isArray(menuItems) &&
          menuItems.map((menuItem) => {
            return (
              <MenuItem
                key={menuItem.key}
                isActive={menuItem.isActive}
                icon={menuItem.icon}
                onClick={onMenuItemClicked}
              />
            );
          })}
      </section>
    </nav>
  );
}

SideBar.propTypes = {
  logo: PropTypes.string.isRequired,
  onMenuItemClicked: PropTypes.func.isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SideBar;
