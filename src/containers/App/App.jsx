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
import { fetchAvailableTalkTracks, fetchTasks, initWorkflow, startWorkflowByName } from "../../store/thunks/thunks";
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
import {setIsFlexTaskActive} from "../../store/actions";
import {calculateWorkFlowNameFromDeploymentID} from "../../utils/tasks";


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
    background: theme.palette.grey["800"],
    width: "100%",
    height: "100vh",
  },
  splashImage: {
    width: theme.spacing(15),
  }
}));

const TEMP_PANES = [{ id: "1", icon: faCommentAlt }];

function App({ deployments, activeWorkflows, isFlexTaskActive, availableTalkTracks, isFlexTaskAccepted, isATalkTrackBeingFetched, dispatch, getDeploymentId, startWorkflowByName, fetchAvailableTalkTracks, fetchTasks, initWorkflow }) {
  const classes = useStyles();
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

  const handleAvailableTalkTrackSelected = (talkTrackWorkflowName) => {
    const isInitialized = isTalkTrackDidInitialized(activeWorkflows, talkTrackWorkflowName);
    if (isInitialized)
      return;
    startWorkflowByName(talkTrackWorkflowName);
  }

  useEffect(() => isFlexTaskAccepted && getDeploymentId(), [isFlexTaskAccepted]);

  useEffect(() => isFlexTaskAccepted && fetchAvailableTalkTracks(), [isFlexTaskAccepted]);

  useEffect(() => {
    if (isAutomaticState && isFlexTaskAccepted) {
      const interval = setInterval(() => fetchTasks(), 500);
      return () => clearInterval(interval);
    }
    return () => {};
  }, [isAutomaticState, isFlexTaskAccepted]);

  useEffect(() => {
    if (isFlexTaskActive === false) {
      const { did, isTalkTrack } = concludeWorkflowDeployment;
      initWorkflow(did, isTalkTrack);
    }
    return () => {};
  }, [isFlexTaskActive, dispatch]);

  useEffect(() => {
    if (Array.isArray(activeWorkflows) && isFlexTaskAccepted){
      initDeployments.forEach(({did, isTalkTrack}) => {
        const activeWorkflow = Array.isArray(activeWorkflows)
            ? activeWorkflows.find(({iid}) => iid.includes(did))
            : null;
        if (activeWorkflow)
          return;
        initWorkflow(did, isTalkTrack);
      });
    }
  }, [activeWorkflows, dispatch, isFlexTaskAccepted]);

  return (
    <div className={classes.app}>
      {
        !isFlexTaskAccepted
            ? ( <div className={classes.splashScreenContainer}>
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
                    <CallerInfo workflowName={calculateWorkFlowNameFromDeploymentID(callWorkflow.did)} callerName="John Doe" />
                  </section>
                  <section className={clsx(classes.tray, classes.tray2, { [classes.contentShift]: isNotesOpen })} data-testid="tray2">

                    { ( !Array.isArray(talkTrackWorkflows) || !Array.isArray(availableTalkTracks) ) &&
                    (
                        <Card>
                          <TalkTrackSkeleton/>
                        </Card>
                    )
                    }

                    { !!( Array.isArray(talkTrackWorkflows) && !talkTrackWorkflows.length ) &&
                      ( <Typography>There are no active talk tracks.</Typography> )
                    }

                    { !!( Array.isArray(talkTrackWorkflows)  && talkTrackWorkflows.length && Array.isArray(availableTalkTracks)) &&
                    (
                        <>
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
                          <Button style={{marginTop: "2em"}} onClick={() => dispatch(setIsFlexTaskActive(false))}>
                            Emulate twilio task closing
                          </Button>
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
  const { deployments, activeWorkflows, availableTalkTracks, isFlexTaskActive, isATalkTrackBeingFetched, isFlexTaskAccepted } = state?.rexFlow ?? {};
  return {
    deployments,
    activeWorkflows,
    availableTalkTracks,
    isFlexTaskActive,
    isATalkTrackBeingFetched,
    isFlexTaskAccepted
  }
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getDeploymentId: () => getDeploymentId(dispatch),
  startWorkflowByName: (workflowName) => startWorkflowByName(dispatch, workflowName),
  fetchAvailableTalkTracks: () => fetchAvailableTalkTracks(dispatch),
  fetchTasks: () => fetchTasks(dispatch),
  initWorkflow: (did, isTalkTrack) => initWorkflow(dispatch, did, isTalkTrack),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
