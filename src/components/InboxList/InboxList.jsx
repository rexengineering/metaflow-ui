import {
  IconButton,
  List,
  ListItem,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import fontAwesomeIcon from "../../utils/propsValidators";

const useStyles = makeStyles((theme) => ({
  listItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    padding: theme.spacing(2),
    width: "100%",
    color: theme.palette.common.white,
  },
}));

function InboxList({ messagesItems, onIboxItemSelected }) {
  const styles = useStyles();
  return (
    <List>
      {Array.isArray(messagesItems) &&
        messagesItems.map(({ icon, cellphoneNumber, color, time }) => (
          <ListItem button key={cellphoneNumber} onClick={onIboxItemSelected}>
            <IconButton style={{ background: color }}>
              <FontAwesomeIcon icon={icon} />
            </IconButton>
            <div className={styles.listItem}>
              <Typography variant="body1">{cellphoneNumber}</Typography>
              <Typography variant="body1">{time}</Typography>
            </div>
          </ListItem>
        ))}
    </List>
  );
}

InboxList.propTypes = {
  messagesItems: PropTypes.arrayOf(
    PropTypes.shape({
      icon: fontAwesomeIcon.isRequired,
      color: PropTypes.string.isRequired,
      hasShadow: PropTypes.bool.isRequired,
      time: PropTypes.string.isRequired,
      cellphoneNumber: PropTypes.string.isRequired,
    })
  ).isRequired,
  onIboxItemSelected: PropTypes.func.isRequired,
};

export default InboxList;
