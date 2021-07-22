import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt, faFileAlt } from "@fortawesome/pro-light-svg-icons";
import {
  CssBaseline,
  makeStyles,
  Drawer,
  IconButton,
  Badge,
} from "@material-ui/core";
import clsx from "clsx";
import {fetchTasks, initWorkflow} from "../../store/thunks/thunks";
import getDeploymentId from "../../store/thunks/getDeploymentId";
import {
  selectActiveWorkflows,
  selectDeployments,
} from "../../store/selectors";
import SideBar from "../../components/Sidebar";
import Notes from "../../components/Notes";
import TalkTracksWrapper from "../../components/TalkTracks";
import PrettySkeleton from "./PrettySkeleton";
import DebugHelpers from "./DebugHelpers";

export const MISC_DRAWER_WIDTH = 295;

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
    width: "20%",
    flexShrink: 0,
    backgroundColor: theme.palette.grey[800],
    padding: theme.spacing(8, 3, 6),
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
  contentShift: {
    marginRight: MISC_DRAWER_WIDTH,
  },
  miscDrawerPaper: {
    width: MISC_DRAWER_WIDTH,
    padding: theme.spacing(2),
  },
}));

const TEMP_PANES = [{ id: "1", icon: faCommentAlt }];

function App() {
  const deployments = useSelector(selectDeployments);
  const [callWorkflow, buyingWorkflow] = deployments;
  const activeWorkflows = useSelector(selectActiveWorkflows);
  const [firstWorkflow] = activeWorkflows ?? [];
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isAutomaticState, setIsAutomaticState] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [activePaneId, setActivePaneId] = useState(TEMP_PANES[0]?.id);
  const [numberOfNotes, setNumberOfNotes] = useState(0);

  const toggleNotes = useCallback(() => setIsNotesOpen((currentIsNotesOpen) => !currentIsNotesOpen), [])

  useEffect(() => dispatch(getDeploymentId()), []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isAutomaticState) {
      const interval = setInterval(() => dispatch(fetchTasks()), 500);
      return () => clearInterval(interval);
    }
    return () => {};
  }, [isAutomaticState, dispatch]);

  useEffect(() => {
    if (buyingWorkflow && activeWorkflows){
      const activeWorkflow = activeWorkflows.find((currentActiveWorkflow) => currentActiveWorkflow.includes(buyingWorkflow));
      if (activeWorkflow)
        return;
      dispatch(initWorkflow(buyingWorkflow));
    }
  }, [buyingWorkflow, activeWorkflows]);

  useEffect(() => {
    if (deployments && activeWorkflows){
      deployments.forEach((deployment) => {
        const activeWorkflow = activeWorkflows.find((currentActiveWorkflow) => currentActiveWorkflow.includes(deployment));
        if (activeWorkflow)
          return;
        dispatch(initWorkflow(deployment));
      });
    }
  }, [deployments, activeWorkflows, dispatch]);


  return (
    <div className={classes.app}>
      <CssBaseline />
      <SideBar
        onMenuItemClicked={setActivePaneId}
        logo="prism.svg"
        menuItems={TEMP_PANES}
        activeMenuItemId={activePaneId}
      />
      <section className={classes.pane}>
        <section className={clsx(classes.tray, classes.tray1)}>

        </section>
        <section className={clsx(classes.tray, classes.tray2, { [classes.contentShift]: isNotesOpen })} data-testid="tray2">
          <TalkTracksWrapper
            onTabChange={() => {}}
            talkTrackWorkflows={activeWorkflows}
            headerAction={(
            <IconButton color="secondary" onClick={toggleNotes} data-testid="drawer-toggle-button">
              <Badge badgeContent={numberOfNotes} color="secondary">
                <FontAwesomeIcon icon={faFileAlt} />
              </Badge>
            </IconButton>)}
            activeTalkTrackID={firstWorkflow}
          />
        </section>
        <Drawer
          open={isNotesOpen}
          variant="persistent"
          anchor="right"
          classes={{ paper: classes.miscDrawerPaper }}
          data-testid="misc-drawer"
        >
          <Notes onNotesNumberChangeCB={setNumberOfNotes} />
          <DebugHelpers
            deployments={deployments}
            setIsAutomaticState={setIsAutomaticState}
            isAutomaticState={isAutomaticState}
          />
        </Drawer>
      </section>
    </div>
  );
}

export default App;
