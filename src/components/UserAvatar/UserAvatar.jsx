import React from "react";
import {Avatar, Badge, ButtonBase, makeStyles, useTheme} from "@material-ui/core";
import PropTypes from "prop-types";
import { BUSY, OFFLINE, ONLINE } from "../../constants";
import UserMenu from "./UserMenu";

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: "50%",
  },
  avatar: {
    width: theme.spacing(6.25),
    height: theme.spacing(6.25),
    background: theme.palette.grey["400"],
  },
}));

function UserAvatar({
  currentStatus,
  username,
  userProfilePhotoURL,
  isDisabled,
  onUserAvatarClick,
  onStatusSelection,
  onClose,
  menuAnchor,
}) {
  const classes = useStyles();
  const { palette } = useTheme();
  const statuses = {
    [ONLINE]: palette.primary.main,
    [OFFLINE]: palette.background.default,
    [BUSY]: palette.miscellaneous1?.main,
  };
  const userNameAvatar = username?.charAt(0);
  return (
    <>
      <ButtonBase className={classes.container} onClick={onUserAvatarClick}>
        <Badge
          color={statuses[currentStatus]}
          badgeContent=" "
          variant="dot"
          invisible={isDisabled}
          overlap="circle"
        >
          <Avatar src={userProfilePhotoURL} className={classes.avatar}>
            {userNameAvatar}
          </Avatar>
        </Badge>
      </ButtonBase>
      <UserMenu
        status={currentStatus}
        statuses={statuses}
        menuAnchor={menuAnchor}
        onMenuClose={onClose}
        onStatusSelection={onStatusSelection}
      />
    </>
  );
}

UserAvatar.defaultProps = {
  userProfilePhotoURL: "",
  isDisabled: "",
  onUserAvatarClick: null,
  onStatusSelection: null,
  onClose: null,
  menuAnchor: null,
};

UserAvatar.propTypes = {
  currentStatus: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  userProfilePhotoURL: PropTypes.string,
  isDisabled: PropTypes.string,
  onUserAvatarClick: PropTypes.func,
  onStatusSelection: PropTypes.func,
  onClose: PropTypes.func,
  menuAnchor: PropTypes.node,
};

export default UserAvatar;
