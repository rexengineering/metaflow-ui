import React from "react";
import { Avatar, Button, makeStyles, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import clsx from "clsx";
import InfoSection from "../InfoSection";

const useStyles = makeStyles((theme) => ({
  managerInfoContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(2, 0),
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  fontColor: {
    color: theme.palette.grey["400"],
  },
  accountManagerName: {
    color: theme.palette.common.white,
  },
  transferCallButton: {
    textTransform: "capitalize",
    borderRadius: theme.spacing(10),
  },
}));

function AccountManagerInfo({
  name,
  roleType,
  phoneNumber,
  onTransferCallClick,
  className,
}) {
  const classes = useStyles();
  return (
    <InfoSection className={clsx(classes.fontColor, className)} title="Team">
      <div className={classes.managerInfoContainer}>
        <Avatar className={classes.avatar}>{name?.charAt(0)}</Avatar>
        <div>
          <Typography className={classes.accountManagerName}>{name}</Typography>
          <Typography variant="h6">{roleType}</Typography>
          <Typography variant="h6">{phoneNumber}</Typography>
        </div>
      </div>
      <Button
        onClick={onTransferCallClick}
        fullWidth
        variant="outlined"
        className={classes.transferCallButton}
      >
        Transfer Call
      </Button>
    </InfoSection>
  );
}

AccountManagerInfo.defaultProps = {
  className: "",
};

AccountManagerInfo.propTypes = {
  name: PropTypes.string.isRequired,
  roleType: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  onTransferCallClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default AccountManagerInfo;
