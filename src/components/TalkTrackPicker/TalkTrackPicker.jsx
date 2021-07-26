import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Menu, MenuItem, IconButton, makeStyles } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  button: {
    height: theme.spacing(6),
    width: theme.spacing(6),
  }
}));

function TalkTrackPicker({ talkTracks, onClickTalkTrack }) {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const onOpenMenu = useCallback(({ currentTarget }) => setMenuAnchor(currentTarget), [setMenuAnchor]);
  const onCloseMenu = useCallback(() => setMenuAnchor(null), [setMenuAnchor]);
  const onClickItem = useCallback((id) => {
    onClickTalkTrack?.(id);
    onCloseMenu();
  }, [onClickTalkTrack, onCloseMenu])

  const classes = useStyles();

  return (
    <>
      <IconButton onClick={onOpenMenu} className={classes.button}>
        <FontAwesomeIcon icon={faPlus} />
      </IconButton>
      <Menu open={!!menuAnchor} onClose={onCloseMenu} anchorEl={menuAnchor}>
        {Array.isArray(talkTracks) && talkTracks.map(({id, label}) => (
          <MenuItem
            key={id}
            onClick={() => onClickItem(id)}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

TalkTrackPicker.propTypes = {
  talkTracks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  onClickTalkTrack: PropTypes.func.isRequired,
};

export default TalkTrackPicker;
