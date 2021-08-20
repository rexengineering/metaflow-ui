import React, { useEffect, useState, useCallback } from "react";
import {connect} from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt, faFileAlt } from "@fortawesome/pro-light-svg-icons";
import {
  CssBaseline,
  makeStyles,
  Drawer,
  IconButton,
  Badge, Typography, Card, Button,
} from "@material-ui/core";
import clsx from "clsx";
import {
  cancelWorkflows,
  fetchAvailableTalkTracks,
  fetchTasks,
  initWorkflow,
  startWorkflowByName
} from "../../store/thunks/thunks";
import getDeploymentId from "../../store/thunks/getDeploymentId";
import SideBar from "../../components/Sidebar";
import Notes from "../../components/Notes";
import TalkTracks from "../../components/TalkTracks";
import DebugHelpers from "./DebugHelpers";
import CallerInfo from "../../components/CallerInfo";
import {callWorkflowDeployment, concludeWorkflowDeployment, introWorkflowDeployment} from "../../utils/deployments";
import TalkTrackSkeleton from "../../components/TalkTracks/TalkTrackSkeleton";
import TalkTrackPicker from "../../components/TalkTrackPicker";
import isTalkTrackDidInitialized from "../../utils/talkTracks";
import {setActiveTalkTrack, setIsFlexTaskAccepted, setIsFlexTaskActive} from "../../store/actions";
import {calculateWorkFlowNameFromDeploymentID} from "../../utils/tasks";
import {talkTrackIdentifierProp} from "../../constants";


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
  splashScreenContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: theme.palette.grey["800"],
    width: "100%",
    height: "100vh",
  },
  splashImage: {
    width: theme.spacing(15),
  }
}));

const TEMP_PANES = [{ id: "1", icon: faCommentAlt }];

function App({ deployments, activeWorkflows, isFlexTaskActive, availableTalkTracks, isFlexTaskAccepted, isATalkTrackBeingFetched, dispatch, getDeploymentId, startWorkflowByName, fetchAvailableTalkTracks, getTasks, initWorkflow, cancelActiveWorkflows, talkTracks, currentActiveTalkTrack }) {
  const classes = useStyles();
  const initDeployments = [callWorkflowDeployment, introWorkflowDeployment];
  const [callWorkflow] = initDeployments;
  const [isAutomaticState, setIsAutomaticState] = useState(true);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [activePaneId, setActivePaneId] = useState(TEMP_PANES[0]?.id);
  const [numberOfNotes, setNumberOfNotes] = useState(0);
  const toggleNotes = useCallback(() => setIsNotesOpen((currentIsNotesOpen) => !currentIsNotesOpen), [])
  const handleActiveTalkTrack = (activeTalkTrackIdentifier) => dispatch(setActiveTalkTrack(activeTalkTrackIdentifier));
  const handleAvailableTalkTrackSelected = (talkTrackWorkflowName) => {
    const isInitialized = isTalkTrackDidInitialized(activeWorkflows, talkTrackWorkflowName);
    if (isInitialized)
      return;
    startWorkflowByName(talkTrackWorkflowName);
  }

  const handleTalkTrackTaskCompleted = ( iid ) => {
    const completedTalkTrackIndex = talkTracks.findIndex(({ iid: currentIid }) => iid === currentIid);
    if (completedTalkTrackIndex < 0)
      return;
    const lastTalkTrackIndex = talkTracks.length - 1;
    if (completedTalkTrackIndex === lastTalkTrackIndex)
      return;

    const nextActiveTalkTrack = talkTracks[completedTalkTrackIndex + 1];
    if (!nextActiveTalkTrack)
      return;

    const activeTalkTrackIdentifier = nextActiveTalkTrack[talkTrackIdentifierProp];
    handleActiveTalkTrack(activeTalkTrackIdentifier);
  }

  useEffect(() => isFlexTaskAccepted && getDeploymentId(), [isFlexTaskAccepted]);

  useEffect(() => isFlexTaskAccepted && fetchAvailableTalkTracks(), [isFlexTaskAccepted]);

  useEffect(() => {
    if (isAutomaticState && isFlexTaskAccepted) {
      const interval = setInterval(() => getTasks(), 2000);
      return () => clearInterval(interval);
    }
    return () => {};
  }, [isAutomaticState, isFlexTaskAccepted]);

  useEffect(() => {
    if (isFlexTaskActive === false) {
      const { did, isTalkTrack } = concludeWorkflowDeployment;
      initWorkflow(did, isTalkTrack, true);
    }
    return () => {};
  }, [isFlexTaskActive]);

  useEffect(() => {
    if (activeWorkflows?.length && isFlexTaskAccepted === false){
      cancelActiveWorkflows(activeWorkflows);
      dispatch(setIsFlexTaskActive(true));
    }
  }, [activeWorkflows, isFlexTaskAccepted, cancelActiveWorkflows]);

  const renderResetButton = (resetFlag) => {
    const buttonMessage = resetFlag ? "Hang up call" : "Make call";
    return (
        <Button variant="contained" onClick={() => dispatch(setIsFlexTaskAccepted(!resetFlag))}>
          {buttonMessage}
        </Button>
    )
  }

  return (
    <div className={classes.app}>
      {
        !isFlexTaskAccepted
            ? (
                <div className={classes.splashScreenContainer}>
                    <img alt="PrismUI" className={classes.splashImage} src="https://cdn.rexhomes.com/assets/images/logos/rex-logo.svg" />
                </div>
              )
            : (<>
                <CssBaseline />
                <SideBar
                    onMenuItemClicked={setActivePaneId}
                    logo="prism.svg"
                    menuItems={TEMP_PANES}
                    activeMenuItemId={activePaneId}
                />
                <section className={classes.pane}>
                  <section className={clsx(classes.tray, classes.tray1)}>
                    <CallerInfo workflowName={calculateWorkFlowNameFromDeploymentID(callWorkflow.did)} />
                  </section>
                  <section className={clsx(classes.tray, classes.tray2, { [classes.contentShift]: isNotesOpen })} data-testid="tray2">

                    { ( !Array.isArray(talkTracks) || !Array.isArray(availableTalkTracks) || !currentActiveTalkTrack) &&
                      (
                          <Card>
                            <TalkTrackSkeleton/>
                          </Card>
                      )
                    }

                    { !!( Array.isArray(talkTracks) && !talkTracks.length ) &&
                      ( <Typography>There are no active talk tracks.</Typography> )
                    }

                    { !!( Array.isArray(talkTracks)  && talkTracks.length && Array.isArray(availableTalkTracks)) && currentActiveTalkTrack &&
                    (
                        <>
                          <TalkTracks
                              setActiveTalkTrack={handleActiveTalkTrack}
                              onTaskCompleted={handleTalkTrackTaskCompleted}
                              isATalkTrackBeingFetched={isATalkTrackBeingFetched}
                              talkTracks={talkTracks}
                              activeTalkTrackID={currentActiveTalkTrack}
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
                          />
                        </>
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
              </>)
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  const { deployments, activeWorkflows, availableTalkTracks, isFlexTaskActive, isATalkTrackBeingFetched, isFlexTaskAccepted, activeTalkTrack: currentActiveTalkTrack } = state?.rexFlow ?? {};
  const talkTracks = Array.isArray(activeWorkflows)
                             ? activeWorkflows?.filter(({isTalkTrack}) => isTalkTrack)
                             : null;
  return {
    deployments,
    activeWorkflows,
    availableTalkTracks,
    isFlexTaskActive,
    isATalkTrackBeingFetched,
    isFlexTaskAccepted,
    talkTracks,
    currentActiveTalkTrack
  }
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getDeploymentId: () => getDeploymentId(dispatch),
  startWorkflowByName: (workflowName) => startWorkflowByName(dispatch, workflowName),
  fetchAvailableTalkTracks: () => fetchAvailableTalkTracks(dispatch),
  getTasks: () => dispatch(fetchTasks()),
  initWorkflow: (did, isTalkTrack, setAsActive) => initWorkflow(dispatch, did, isTalkTrack, setAsActive),
  cancelActiveWorkflows: (activeWorkflows) => cancelWorkflows(dispatch, activeWorkflows),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
