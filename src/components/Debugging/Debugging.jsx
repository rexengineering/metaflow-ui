import React from "react";
import { connect } from "react-redux";
import { useFormik } from "formik";
import {
    Button,
    FormControl,
    InputLabel, List, ListItem, ListItemSecondaryAction, ListItemText, ListSubheader,
    makeStyles,
    MenuItem,
    Select,
} from "@material-ui/core";
import { object, string } from "yup";
import instantiateWorkflow from "../../store/thunks/instantiateWorkflow";
import instantiateWorkflowByName from "../../store/thunks/instantiateWorkflowByName";

const validationSchema = {
    addInteraction: object({
        addInteractionIdentifier: string().required("Please enter a value"),
    }),
    removeInteraction: object({
        removeInteractionIdentifier: string().required("Please enter a value"),
    }),
    instantiateByName: object({
        workflowName: string().required("Please enter a value"),
    }),
};

const initialValues = {
    addInteraction: { addInteractionIdentifier: "" },
    removeInteraction: { removeInteractionIdentifier: "" },
    instantiateByName: { workflowName: "" },
}

const useStyles = makeStyles((theme) => ({
    form: {
        display: "flex",
        flexDirection: "column",
        marginBottom: theme.spacing(2),
    },
    inputField: {
      color: theme.palette.common.white,
    },
    submitButton: {
        marginTop: theme.spacing(2),
    },
    listSecondaryItem: {
        position: "initial",
        margin: theme.spacing(0.5, 0, 0, 1),
    }
}));

const workflowNames = [ "CallWorkflow",  "bookshowing",  "buying",  "conclude",  "intro",  "questions",  "selling"];

function Debugging({ availableWorkflows, instantiateWorkflow, instantiateWorkflowByName }){
  const classes = useStyles();

  const handleInstantiateWorkflowByName = ({ workflowName }) => instantiateWorkflowByName(workflowName);
  const instantiateByNameFormik = useFormik({
      initialValues: initialValues.instantiateByName,
      validationSchema: validationSchema.instantiateByName,
      onSubmit: handleInstantiateWorkflowByName,
  });

  const handleInstantiateWorkflow = (did) => instantiateWorkflow(did);

  return (
      <section>
          {
              Array.isArray(availableWorkflows)
                ? (
                      <List subheader={<ListSubheader>Available workflows</ListSubheader>}
                            className={classes.root}>
                          {
                              availableWorkflows.map((currentWorkflow) => (
                                  <ListItem key={currentWorkflow}>
                                      <ListItemText primary={currentWorkflow} />
                                      <ListItemSecondaryAction className={classes.listSecondaryItem}>
                                          <Button size="small" onClick={() => handleInstantiateWorkflow(currentWorkflow)} color="secondary">Instantiate by DID</Button>
                                      </ListItemSecondaryAction>
                                  </ListItem>
                              ))
                          }
                      </List>
                  )
                : null
          }

          {
              (
                      <form className={classes.form} onSubmit={instantiateByNameFormik.handleSubmit} >
                          <FormControl>
                              <InputLabel id="workflowNames">Workflow names</InputLabel>
                              <Select
                                  className={classes.inputField}
                                  id="workflowNames"
                                  name="workflowName"
                                  value={instantiateByNameFormik.values.workflowName}
                                  error={instantiateByNameFormik.touched.workflowName && !!instantiateByNameFormik.errors.workflowName}
                                  onChange={instantiateByNameFormik.handleChange}
                              >
                                  {
                                      workflowNames.map((workflowName) => (
                                          <MenuItem value={workflowName} key={workflowName}>
                                              {workflowName}
                                          </MenuItem>
                                      ))
                                  }
                              </Select>
                          </FormControl>

                          <Button type="submit"
                                  size="small"
                                  variant="outlined"
                                  color="primary"
                                  className={classes.submitButton}
                          >
                              Instantiate by name
                          </Button>
                      </form>
                  )
          }

      </section>
  );
}

const mapStateToProps = ({ rexFlow: { workflows: { available } } }) => ({
    availableWorkflows: available,
});

const mapDispatchToProps = (dispatch) => ({
   instantiateWorkflow: (did) => dispatch(instantiateWorkflow(did)),
   instantiateWorkflowByName: (workflowName) => dispatch(instantiateWorkflowByName(workflowName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Debugging);
