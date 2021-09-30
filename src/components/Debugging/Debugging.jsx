import React, {useContext} from "react";
import { useFormik } from "formik";
import {
    Button,
    FormControl,
    InputLabel, List, ListItem, ListItemSecondaryAction, ListItemText, ListSubheader,
    makeStyles,
    MenuItem,
    Select,
    TextField
} from "@material-ui/core";
import { object, string } from "yup";
import { addInteraction, removeInteraction, setActiveInteractionId } from "../../rexui/store/actions";
import { Context } from "../../rexui/Context";

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

function Debugging(){

    const {
        dispatch,
        state: {
            interactions: interactionsObject,
            activeInteractionId,
            workflows: {
                available: availableWorkflows
            }
        },
        thunks: {
            instantiateWorkflowByName,
            instantiateWorkflow
        }
    } = useContext(Context);

    const interactions = Object.keys(interactionsObject);


  const classes = useStyles();
  const handleOnAddingInteraction = ({ addInteractionIdentifier }) => dispatch(addInteraction(addInteractionIdentifier));
  const handleOnRemovingInteraction = ( removeInteractionIdentifier ) => { dispatch(removeInteraction(removeInteractionIdentifier)) };
  const handleInstantiateWorkflowByName = ({ workflowName }) => instantiateWorkflowByName(activeInteractionId, workflowName);

    const addInteractionFormik = useFormik({
      initialValues: initialValues.addInteraction,
      validationSchema: validationSchema.addInteraction,
      onSubmit: handleOnAddingInteraction,
  });
  const removeInteractionFormik = useFormik({
      initialValues: initialValues.removeInteraction,
      validationSchema: validationSchema.removeInteraction,
      onSubmit: handleOnRemovingInteraction,
  });
  const instantiateByNameFormik = useFormik({
      initialValues: initialValues.instantiateByName,
      validationSchema: validationSchema.instantiateByName,
      onSubmit: handleInstantiateWorkflowByName,
  });
  const handleSetInteractionActive = (interactionIdentifier) => dispatch(setActiveInteractionId(interactionIdentifier));
  const handleInstantiateWorkflow = (did) => instantiateWorkflow(activeInteractionId, did);

  return (
      <section>
          <form className={classes.form} onSubmit={addInteractionFormik.handleSubmit}>
              <TextField
                  InputProps={{
                    className: classes.inputField
                  }}
                  label="Interaction identifier"
                  name="addInteractionIdentifier"
                  error={addInteractionFormik.touched.addInteractionIdentifier && !!addInteractionFormik.errors.addInteractionIdentifier}
                  helperText={addInteractionFormik.touched.addInteractionIdentifier && addInteractionFormik.errors.addInteractionIdentifier}
                  value={addInteractionFormik.values.addInteractionIdentifier}
                  onChange={addInteractionFormik.handleChange}
              />
              <Button
                  type="submit"
                  size="small"
                  variant="outlined"
                  color="secondary"
                  className={classes.submitButton}
              >
                  Add Interaction
              </Button>
          </form>

          {
              Array.isArray(interactions) && interactions.length
                ? (
                      <form className={classes.form} >
                          <FormControl>
                              <InputLabel id="interactions">Interactions</InputLabel>
                              <Select
                                  className={classes.inputField}
                                  id="interactions"
                                  label="Remove Interaction"
                                  name="removeInteractionIdentifier"
                                  value={removeInteractionFormik.values.removeInteractionIdentifier}
                                  error={removeInteractionFormik.touched.removeInteractionIdentifier && !!removeInteractionFormik.errors.removeInteractionIdentifier}
                                  onChange={removeInteractionFormik.handleChange}
                              >
                                  {
                                      interactions.map((interaction) => (
                                          <MenuItem value={interaction} key={interaction}>
                                                {interaction}
                                          </MenuItem>
                                      ))
                                  }
                              </Select>
                          </FormControl>

                          <Button onClick={() => handleOnRemovingInteraction(removeInteractionFormik.values.removeInteractionIdentifier)}
                              type="button"
                              size="small"
                              variant="outlined"
                              color="primary"
                              className={classes.submitButton}
                          >
                              Remove Interaction
                          </Button>

                          <Button onClick={() => handleSetInteractionActive(removeInteractionFormik.values.removeInteractionIdentifier)}
                              type="button"
                              size="small"
                              variant="outlined"
                              color="secondary"
                              className={classes.submitButton}
                          >
                              Set interaction active
                          </Button>
                      </form>
                  )
                : null
          }

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

export default Debugging;
