import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt, faFileAlt } from "@fortawesome/pro-light-svg-icons";
import {
  CssBaseline,
  makeStyles,
  Drawer,
  IconButton,
  Badge, Typography, Card,
} from "@material-ui/core";
import clsx from "clsx";
import { fetchAvailableTalkTracks, fetchTasks, initWorkflow, startWorkflowByName } from "../../store/thunks/thunks";
import getDeploymentId from "../../store/thunks/getDeploymentId";
import {
  selectActiveWorkflows, selectAvailableTalkTracks,
  selectDeployments, selectIsATalkTrackBeingFetched, selectIsFlexTaskActive,
} from "../../store/selectors/rexflow";
import SideBar from "../../components/Sidebar";
import Notes from "../../components/Notes";
import TalkTracks from "../../components/TalkTracks";
import DebugHelpers from "./DebugHelpers";
import CallerInfo from "../../components/CallerInfo";
import {callWorkflowDeployment, concludeWorkflowDeployment, introWorkflowDeployment} from "../../utils/deployments";
import TalkTrackSkeleton from "../../components/TalkTracks/TalkTrackSkeleton";
import TalkTrackPicker from "../../components/TalkTrackPicker";
import isTalkTrackDidInitialized from "../../utils/talkTracks";

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
    padding: theme.spacing(0, 3, 6),
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
  cardButtons: {
    display: "flex",
  },
}));

const TEMP_PANES = [{ id: "1", icon: faCommentAlt }];

function App() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const deployments = useSelector(selectDeployments);
  const activeWorkflows = useSelector(selectActiveWorkflows);
  const availableTalkTracks = useSelector(selectAvailableTalkTracks);
  const isFlexTaskActive = useSelector(selectIsFlexTaskActive);
  const initDeployments = [callWorkflowDeployment, introWorkflowDeployment];
  const talkTrackWorkflows = Array.isArray(activeWorkflows)
                                ? activeWorkflows.filter(({isTalkTrack}) => isTalkTrack)
                                : null;
  const [firstTalkTrack] = talkTrackWorkflows ?? [];
  const [callWorkflow] = initDeployments;
  const [isAutomaticState, setIsAutomaticState] = useState(true);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [activePaneId, setActivePaneId] = useState(TEMP_PANES[0]?.id);
  const [numberOfNotes, setNumberOfNotes] = useState(0);
  const toggleNotes = useCallback(() => setIsNotesOpen((currentIsNotesOpen) => !currentIsNotesOpen), [])
  const isATalkTrackBeingFetched = useSelector(selectIsATalkTrackBeingFetched);
  const handleAvailableTalkTrackSelected = (talkTrackWorkflowName) => {
    const isInitialized = isTalkTrackDidInitialized(activeWorkflows, talkTrackWorkflowName);
    if (isInitialized)
      return;
    dispatch(startWorkflowByName(talkTrackWorkflowName));
  }

  useEffect(() => dispatch(getDeploymentId()), []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => dispatch(fetchAvailableTalkTracks()), []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isAutomaticState) {
      const interval = setInterval(() => dispatch(fetchTasks()), 500);
      return () => clearInterval(interval);
    }
    return () => {};
  }, [isAutomaticState, dispatch]);

  useEffect(() => {
    if (isFlexTaskActive === false) {
      const { did, isTalkTrack } = concludeWorkflowDeployment;
      dispatch(initWorkflow(did, isTalkTrack));
    }
    return () => {};
  }, [isFlexTaskActive, dispatch]);

  useEffect(() => {
    if (Array.isArray(activeWorkflows)){
      initDeployments.forEach(({did, isTalkTrack}) => {
        const activeWorkflow = Array.isArray(activeWorkflows)
            ? activeWorkflows.find(({iid}) => iid.includes(did))
            : null;
        if (activeWorkflow)
          return;
        dispatch(initWorkflow(did, isTalkTrack));
      });
    }
  }, [activeWorkflows, dispatch]);

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
          <CallerInfo deploymentID={callWorkflow.did} callerName="John Doe" />
        </section>
        <section className={clsx(classes.tray, classes.tray2, { [classes.contentShift]: isNotesOpen })} data-testid="tray2">

          { ( !Array.isArray(talkTrackWorkflows) || !Array.isArray(availableTalkTracks) ) &&
            (
              <Card>
                <TalkTrackSkeleton/>
              </Card>
            )
          }

          { ( Array.isArray(talkTrackWorkflows) && !talkTrackWorkflows.length ) &&
            ( <Typography>There are no active talk tracks.</Typography> )
          }

          { ( Array.isArray(talkTrackWorkflows)  && talkTrackWorkflows.length && Array.isArray(availableTalkTracks)) &&
          (
                <TalkTracks
                    isATalkTrackBeingFetched={isATalkTrackBeingFetched}
                    talkTrackWorkflows={talkTrackWorkflows}
                    headerAction={(
                        <div className={classes.cardButtons}>
                          <IconButton color="secondary" onClick={toggleNotes} data-testid="drawer-toggle-button">
                            <Badge badgeContent={numberOfNotes} color="secondary">
                              <FontAwesomeIcon icon={faFileAlt} />
                            </Badge>
                          </IconButton>
                          <TalkTrackPicker
                              availableTalkTracks={availableTalkTracks}
                              onMenuItemSelected={handleAvailableTalkTrackSelected}
                              isDisabled={!isFlexTaskActive} />
                        </div>
                    )}
                    activeTalkTrackID={firstTalkTrack?.iid}
                />
            )
          }
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
