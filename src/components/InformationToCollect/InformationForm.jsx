import React from "react";
import {Card, makeStyles, Typography} from "@material-ui/core";
import Workflow from "../Workflow";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3),
        marginTop: theme.spacing(2),
    },
    title: {
        textAlign: "center",
        marginBottom: theme.spacing(2),
    }
}));

function InformationForm({workflowID}){
    const classes = useStyles();

    if (!workflowID)
        return null;

    return (
        <Card className={classes.container}>
            <Typography className={classes.title} variant="h6">Information to Collect</Typography>
            <Workflow workflowID={workflowID} />
        </Card>
    )
}

InformationForm.defaultProps = {
    workflowID: "",
}

InformationForm.propTypes = {
    workflowID: PropTypes.string,
}

export default InformationForm;