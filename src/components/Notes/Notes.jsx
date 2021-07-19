import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { Formik } from "formik";
import { object as yupObject } from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/pro-solid-svg-icons";
import TaskField from "../fields/TaskField";
import { TEXT, validationSchemaMapping } from "../../constants/taskTypes";

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(1),
  },
  notesContainer: {
    overflowY: "auto",
  },
  userNote: {
    whiteSpace: "pre-wrap",
  },
}));

function Notes({ onNotesNumberChangeCB }) {
  const [notes, setNotes] = useState([]);
  const classes = useStyles();
  const initialValues = { newNote: "" };
  const validationSchema = yupObject({
    newNote: validationSchemaMapping[TEXT],
  });

  useEffect(() => {
    if (onNotesNumberChangeCB) {
      onNotesNumberChangeCB(notes?.length);
    }
  }, [onNotesNumberChangeCB, notes]);

  const onTextAreaKeyDown = useCallback((event, handleSubmit) => {
    if (event?.keyCode === 13 && !event?.shiftKey) {
      event?.preventDefault();
      event?.stopPropagation();
      handleSubmit();
    }
  }, []);

  const addNote = useCallback(
    ({ newNote }, { resetForm }) => {
      setNotes((currentNotes) => [
        ...currentNotes,
        { id: Math.random(), message: newNote, date: new Date() },
      ]);
      resetForm();
    },
    [setNotes]
  );

  const removeNote = useCallback((id) => {
    setNotes((currentNotes) => currentNotes.filter((note) => note.id !== id));
  }, []);

  return (
    <>
      <Typography variant="h5" align="center">
        Notes
      </Typography>
      <div className={classes.notesContainer}>
        {Array.isArray(notes) &&
          notes.map(({ id, message, date }) => (
            <Card key={id} className={classes.card} variant="outlined">
              <CardHeader
                action={
                  <IconButton onClick={() => removeNote(id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </IconButton>
                }
                title={date.toLocaleTimeString()}
              />
              <CardContent>
                <Typography
                  className={classes.userNote}
                  data-testid="note-message"
                >
                  {message}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={addNote}
      >
        {({ handleSubmit }) => (
          <Card onSubmit={handleSubmit} component="form">
            <CardContent>
              <TaskField
                id="newNote"
                type={TEXT}
                multiline
                fullWidth
                label="New Note"
                onKeyDown={(event) => onTextAreaKeyDown(event, handleSubmit)}
              />
            </CardContent>
            <CardActions>
              <Button type="submit">Add</Button>
            </CardActions>
          </Card>
        )}
      </Formik>
    </>
  );
}

Notes.propTypes = {
  onNotesNumberChangeCB: PropTypes.func,
};

Notes.defaultProps = {
  onNotesNumberChangeCB: undefined,
};

export default Notes;
