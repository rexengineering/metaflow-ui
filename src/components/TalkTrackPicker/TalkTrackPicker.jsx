import React, {useState} from "react";
import { IconButton, makeStyles, Menu, MenuItem } from "@material-ui/core";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-solid-svg-icons/faPlus";

const useStyles = makeStyles(({ spacing }) => ({
    menuContainer: {
        width: spacing(100),
    }
}));

function TalkTrackPicker({ availableTalkTracks, onMenuItemSelected, isDisabled }){
    const [anchor, setAnchor] = useState(null);
    const handleItemSelected = (did) => {
        onMenuItemSelected(did);
        handleClose();
    };
    const handleOnClick = ({currentTarget}) => setAnchor(currentTarget);
    const handleClose = () => setAnchor(null);
    const classes = useStyles();

    return (
        <div>
            <IconButton disabled={isDisabled} onClick={handleOnClick} type="button" color="default">
                <FontAwesomeIcon icon={faPlus} />
            </IconButton>
            <Menu
                className={classes.menuContainer}
                anchorEl={anchor}
                keepMounted
                open={!!anchor}
                onClose={handleClose}
            >
                { Array.isArray(availableTalkTracks) &&
                    availableTalkTracks.map(({name, did}) => (
                        <MenuItem key={did} onClick={() => handleItemSelected(did)}>
                            {name}
                        </MenuItem>
                    ))
                }
            </Menu>
        </div>
    )
}

TalkTrackPicker.defaultProps = {
 isDisabled: false,
}

TalkTrackPicker.propTypes = {
 availableTalkTracks: PropTypes.arrayOf(PropTypes.shape({
     name: PropTypes.string.isRequired,
     did: PropTypes.string.isRequired,
 })).isRequired,
 onMenuItemSelected: PropTypes.func.isRequired,
 isDisabled: PropTypes.bool,
}

export default TalkTrackPicker;