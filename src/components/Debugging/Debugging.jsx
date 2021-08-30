import React from "react";
import { connect } from "react-redux";
import { useFormik } from "formik";
import {Button, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField} from "@material-ui/core";
import { object, string } from "yup";
import {addInteraction, removeInteraction} from "../../store/actions";

const validationSchema = {
    addInteraction: object({
        addInteractionIdentifier: string().required("Please enter a value"),
    }),
    removeInteraction: object({
        removeInteractionIdentifier: string().required("Please enter a value"),
    }),
};

const initialValues = {
    addInteraction: { addInteractionIdentifier: "" },
    removeInteraction: { removeInteractionIdentifier: "" },
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
    }
}));

function Debugging({ dispatch, interactions }){
  const classes = useStyles();
  const handleOnAddingInteraction = ({addInteractionIdentifier}) => dispatch(addInteraction(addInteractionIdentifier));
  const handleOnRemovingInteraction = ({removeInteractionIdentifier}) => { dispatch(removeInteraction(removeInteractionIdentifier)) };
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
                  variant="contained"
                  color="secondary"
                  className={classes.submitButton}
              >
                  Add Interaction
              </Button>
          </form>

          {
              Array.isArray(interactions) && interactions.length
                ? (
                      <form className={classes.form} onSubmit={removeInteractionFormik.handleSubmit}>
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
                                          <MenuItem value={interaction}>
                                                {interaction}
                                          </MenuItem>
                                      ))
                                  }
                              </Select>
                          </FormControl>

                          <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                              className={classes.submitButton}
                          >
                              Remove Interaction
                          </Button>
                      </form>
                  )
                : null
          }



      </section>
  );
}

const mapStateToProps = ({ rexFlow: { interactions } }) => ({
    interactions: Object.keys(interactions),
});

export default connect(mapStateToProps)(Debugging);