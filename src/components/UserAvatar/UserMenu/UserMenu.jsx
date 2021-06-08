import {
  Badge,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles((theme) => ({
  underlinedText: {
    textDecoration: "underline",
  },
  listItem: {
    padding: theme.spacing(0.625, 2, 0),
  },
  menu: {
    marginTop: theme.spacing(4),
  },
  typographyToCapitalize: {
    textTransform: "capitalize",
  },
}));

function UserMenu({
  status,
  statuses,
  menuAnchor,
  onMenuClose,
  onStatusSelection,
}) {
  const classes = useStyles();
  const userStatusOptions = Object.keys(statuses);
  return (
    <Menu
      className={classes.menu}
      open={!!menuAnchor}
      anchorEl={menuAnchor}
      onClose={onMenuClose}
    >
      <MenuItem disabled className={classes.underlinedText}>
        Set your status
      </MenuItem>
      {Array.isArray(userStatusOptions) &&
        userStatusOptions.map((currentStatusKey) => {
          const isCurrentState = status === currentStatusKey;
          const typographyVariant = isCurrentState ? "body1" : "h6";
          return (
            <MenuItem
              onClick={() => onStatusSelection(currentStatusKey)}
              className={classes.listItem}
              key={currentStatusKey}
            >
              <Badge
                background={statuses[status]}
                variant="dot"
                invisible={isCurrentState}
              >
                <Typography
                  className={classes.typographyToCapitalize}
                  variant={typographyVariant}
                >
                  {currentStatusKey}
                </Typography>
              </Badge>
            </MenuItem>
          );
        })}
      <MenuItem disabled className={classes.underlinedText}>
        Account
      </MenuItem>
      <MenuItem>Profile</MenuItem>
      <MenuItem>Logout</MenuItem>
    </Menu>
  );
}

UserMenu.defaultProps = {
  menuAnchor: null,
};

UserMenu.propTypes = {
  status: PropTypes.string.isRequired,
  statuses: PropTypes.objectOf(PropTypes.any).isRequired,
  menuAnchor: PropTypes.objectOf(PropTypes.any),
  onMenuClose: PropTypes.func.isRequired,
  onStatusSelection: PropTypes.func.isRequired,
};

export default UserMenu;
