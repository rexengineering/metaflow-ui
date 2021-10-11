import React from "react";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
    iframe: {
        border: "none",
        width: "100%",
        height: "100%",
    },
    container: {
        width: "100%",
        height: "100vh",
    },
}));

function TwilioFlex({twilioFlexURL, className}){
    const classes = useStyles();
    return (
        <section className={clsx(classes.container, className)}>
            <iframe title="twilioFlex" className={classes.iframe} src={twilioFlexURL} />
        </section>
    );
}

TwilioFlex.defaultProps = {
  className: "",
}

TwilioFlex.propTypes = {
  twilioFlexURL: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default TwilioFlex;