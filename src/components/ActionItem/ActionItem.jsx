import PropTypes from "prop-types";
import {
  Checkbox,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { faTrashAlt } from "@fortawesome/pro-light-svg-icons/faTrashAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import {
  ActionItemCheckType,
  ActionItemDeleteType,
  ActionItemDisplayOnlyType,
} from "../../constants";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1, 2),
    background: theme.palette.grey["600"],
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(1.5),
  },
  label: {
    flexGrow: 1,
    color: theme.palette.grey["200"],
  },
  actionElement: {
    display: "inline-block",
    background: theme.palette.grey["800"],
    color: theme.palette.common.white,
    borderRadius: theme.spacing(1),
  },
  iconButtonSize: {
    fontSize: theme.spacing(2.5),
  },
}));

function ActionItem({ actionType, label, onAction, isChecked, className }) {
  const classes = useStyles();
  const handleOnAction = () => onAction(label, actionType);
  return (
    <div className={clsx(classes.container, className)}>
      <Typography className={classes.label}>{label}</Typography>
      <div className={classes.actionElement}>
        {
          {
            [ActionItemDisplayOnlyType]: null,
            [ActionItemCheckType]: (
              <Checkbox checked={isChecked} onChange={handleOnAction} />
            ),
            [ActionItemDeleteType]: (
              <IconButton
                onClick={handleOnAction}
                className={classes.iconButtonSize}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </IconButton>
            ),
          }[actionType]
        }
      </div>
    </div>
  );
}

ActionItem.defaultProps = {
  onAction: () => {},
  isChecked: false,
  className: "",
};

ActionItem.propTypes = {
  actionType: PropTypes.oneOf([
    ActionItemCheckType,
    ActionItemDeleteType,
    ActionItemDisplayOnlyType,
  ]).isRequired,
  label: PropTypes.string.isRequired,
  onAction: PropTypes.func,
  isChecked: PropTypes.bool,
  className: PropTypes.string,
};

export default ActionItem;
