import React, {useState} from "react";
import {CircularProgress, IconButton, makeStyles, Menu, MenuItem} from "@material-ui/core";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-solid-svg-icons/faPlus";
import isTalkTrackDidInitialized from "../../utils/talkTracks";
import clsx from "clsx";
import {connect} from "react-redux";
import { LoadingButtonState } from "../../constants";

const useStyles = makeStyles(({ spacing }) => ({
    menuContainer: {
        width: spacing(100),
    },
    disabledMenuItem: {
       opacity: 0.3,
    },
    circularProgress: {
        marginRight: spacing(1),
    },
}));

function TalkTrackPicker({ availableTalkTracks, onMenuItemSelected, isDisabled, activeWorkflows, buttonsState }){
    const [anchor, setAnchor] = useState(null);
    const handleItemSelected = (name) => {
        onMenuItemSelected(name);
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
                    availableTalkTracks.map(({name, did}) => {
                        const isLoading = buttonsState[name] === LoadingButtonState;
                        const isDisabled = isTalkTrackDidInitialized(activeWorkflows, did) || isLoading;
                        return (
                            <MenuItem
                                className={clsx({
                                    [classes.disabledMenuItem]: isDisabled
                                })}
                                disableRipple={isDisabled}
                                disabled={isDisabled}
                                key={did}
                                onClick={() => handleItemSelected(name)}>
                                    {
                                        isLoading &&
                                            ( <CircularProgress className={classes.circularProgress} size={12} /> )
                                    }
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

const mapStateToProps = (state) => {
    const { activeWorkflows, buttons } = state?.rexFlow ?? { };
    return {
        activeWorkflows: activeWorkflows ?? [],
        buttonsState: buttons,
    }
};

export default connect(mapStateToProps)(TalkTrackPicker);