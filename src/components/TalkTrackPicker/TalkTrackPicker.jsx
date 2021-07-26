import React, {useState} from "react";
import { IconButton, makeStyles, Menu, MenuItem } from "@material-ui/core";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-solid-svg-icons/faPlus";
import isTalkTrackDidInitialized from "../../utils/talkTracks";
import clsx from "clsx";
import {useSelector} from "react-redux";
import {selectActiveWorkflows} from "../../store/selectors/rexflow";

const useStyles = makeStyles(({ spacing }) => ({
    menuContainer: {
        width: spacing(100),
    },
    disabledMenuItem: {
       opacity: 0.3,
    }
}));

function TalkTrackPicker({ availableTalkTracks, onMenuItemSelected, isDisabled }){
    const [anchor, setAnchor] = useState(null);
    const handleItemSelected = (name) => {
        onMenuItemSelected(name);
        handleClose();
    };
    const handleOnClick = ({currentTarget}) => setAnchor(currentTarget);
    const handleClose = () => setAnchor(null);
    const classes = useStyles();
    const activeWorkflows = useSelector(selectActiveWorkflows);

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
                    availableTalkTracks.map(({name, did}) => {
                        const isDisabled = isTalkTrackDidInitialized(activeWorkflows, name);
                        return (
                            <MenuItem
                                className={clsx({
                                    [classes.disabledMenuItem]: isDisabled
                                })}
                                disableRipple={isDisabled}
                                disabled={isDisabled}
                                key={did}
                                onClick={() => handleItemSelected(name)}>
                                {name}
                            </MenuItem>
                        );
                    })
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