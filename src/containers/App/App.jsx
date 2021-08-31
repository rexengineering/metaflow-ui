import React, {useEffect} from "react";
import {
  CssBaseline,
  makeStyles,
} from "@material-ui/core";
import clsx from "clsx";
import Debugging from "../../components/Debugging";
import {connect} from "react-redux";
import Interaction from "../../components/Interaction";
import fetchAvailableWorkflows  from "../../store/thunks/fetchAvailableWorkflows";

const useStyles = makeStyles((theme) => ({
  app: {
    display: "flex",
    height: "100vh",
  },
  pane: {
    width: "100%",
    background: theme.palette.common.white,
    color: theme.palette.text.secondary,
    display: "flex",
  },
  tray: {
    width: "100%",
    background: theme.palette.background.default,
  },
  tray1: {
    width: "25%",
    flexShrink: 0,
    backgroundColor: theme.palette.grey[800],
    padding: theme.spacing(2, 3, 6),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "auto",
  },
  tray2: {
    padding: theme.spacing(3),
    overflow: "auto",
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

function App({ interactions, getAvailableWorkflows, activeInteractionId }) {
  const classes = useStyles();

  useEffect(() => getAvailableWorkflows(), []);

  return (
    <div className={classes.app}>
      <CssBaseline />
      <section className={classes.pane}>
        <section className={clsx(classes.tray, classes.tray1)}>
          <Debugging />
        </section>
        <section className={clsx(classes.tray, classes.tray2)} data-testid="tray2">
          {
            Array.isArray(interactions) && interactions.map(({ id }) => (
                <Interaction key={id} identifier={id} isActive={activeInteractionId === id} />
            ))
          }
        </section>
      </section>
    </div>
  );
}

const mapStateToProps = ({ rexFlow: { interactions, activeInteractionId }}) => {
  const interactionsIDs = Object.keys(interactions);
  const mappedInteractions = interactionsIDs.map((currentInteractionId) => {
    const interaction = interactions[currentInteractionId];
    return {
      ...interaction,
      id: currentInteractionId
    }
  })
  return {
    activeInteractionId,
    interactions: mappedInteractions,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAvailableWorkflows: () => dispatch(fetchAvailableWorkflows()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
