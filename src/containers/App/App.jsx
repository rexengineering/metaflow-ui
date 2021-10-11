import React, {useEffect} from "react";
import {
  CssBaseline,
  makeStyles,
} from "@material-ui/core";
import clsx from "clsx";
import Debugging from "../../components/Debugging";
import {connect} from "react-redux";
import fetchAvailableWorkflows  from "../../store/thunks/fetchAvailableWorkflows";
import eventBroadcast from "../../store/thunks/subscription/eventBroadcast";
import Workflow from "../../components/Workflow";
import keepAlive from "../../store/thunks/subscription/keepAlive";

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

function App({ instantiatedWorkflows, getAvailableWorkflows, keepAliveSubscription, dispatch }) {
  const classes = useStyles();

  useEffect(() => getAvailableWorkflows(), []);
  useEffect(() => eventBroadcast(dispatch), []);
  useEffect(() => {
    const interval = setInterval(() => keepAliveSubscription(), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.app}>
      <CssBaseline />
      <section className={classes.pane}>
        <section className={clsx(classes.tray, classes.tray1)}>
          <Debugging />
        </section>
        <section className={clsx(classes.tray, classes.tray2)} data-testid="tray2">
          {
            Array.isArray(instantiatedWorkflows) && instantiatedWorkflows.map(({ iid }) => (
                <Workflow identifier={iid} key={iid} />
            ))
          }
        </section>
      </section>
    </div>
  );
}

const mapStateToProps = ({ rexFlow: { instantiatedWorkflows }}) => ({
  instantiatedWorkflows
});

const mapDispatchToProps = (dispatch) => ({
  getAvailableWorkflows: () => dispatch(fetchAvailableWorkflows()),
  keepAliveSubscription: () => dispatch(keepAlive()),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
