import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faCommentAlt } from "@fortawesome/pro-light-svg-icons";
import {
  CssBaseline,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Pane from "../../components/Pane";
import Tray from "../../components/Tray";
import {
  fetchActiveTalkTracks,
  fetchTasks,
  initTalkTrack,
  initWorkflow, setActiveStep,
  setTalkTrackActive
} from "../../store/thunks/thunks";
import getDeploymentId from "../../store/thunks/getDeploymentId";
import {
  selectActiveWorkflows,
  selectDeployments,
} from "../../store/selectors/rexflow";
import SideBar from "../../components/Sidebar";
import TalkTrack from "../../components/TalkTracks/TalkTrack";
import {selectTalkTracks} from "../../store/selectors/talktracks";
import {mapTalkTracks, getActiveTalkTrackID, getActiveTalkTrackWorkflow} from "../../utils/talkTracks";
import Notes from "../../components/Notes";
import CallerInfo from "../../components/CallerInfo/Callerinfo";
import InformationForm from "../../components/InformationToCollect/InformationForm";
import PostTaskModal from "../../components/PostTaskModal";

const useStyles = makeStyles((theme) => ({
  app: {
    display: "flex",
    height: "100vh",
  },
  tray1: {
    width: "30%",
    backgroundColor: theme.palette.grey[800],
    padding: theme.spacing(8, 3, 6),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "auto",
  },
  tray2: {
    padding: theme.spacing(3, 1.5, 3, 3),
    overflow: "auto",
  },
  tray3: {
    width: "60%",
    padding: theme.spacing(3, 3, 3, 1.5),
    overflow: "auto",
  },
  workflow: {
    marginTop: theme.spacing(1),
    background: theme.palette.background.paper,
    padding: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
    display: "block",
  },
  paper: {
    padding: theme.spacing(2.5),
  },
  paperHeading: {
    marginBottom: theme.spacing(1.5),
    "&:last-child": {
      marginBottom: 0,
    },
  },
  deployment: {
    marginBottom: theme.spacing(2),
  },
  deploymentTitle: {
    marginBottom: theme.spacing(1),
  },
  talkTracks: {
    marginTop: theme.spacing(2),
    paddingBottom: theme.spacing(5),
  },
}));

function App() {
  const deployments = useSelector(selectDeployments);
  const activeWorkflows = useSelector(selectActiveWorkflows);
  const talkTracks = mapTalkTracks(useSelector(selectTalkTracks));
  const [activeTalkTrackID, setActiveTalkTrackID] = useState(getActiveTalkTrackID(talkTracks));
  const dispatch = useDispatch();
  const classes = useStyles();
  const searchTalkTrackByIdentifier = (talkTrackIdentifier) => talkTracks.find(({ talktrackId }) => talktrackId === talkTrackIdentifier);
  const areDeploymentsUnavailable =
    Array.isArray(deployments) && !deployments.length;
  const isAutomaticState = true;
  const handleTalkTrackContinue = ({stepIdentifier, talkTrackIdentifier}) => {
    const talktrack = talkTracks.find(({ identifier }) => identifier === talkTrackIdentifier);
    if (!talktrack)
      return;

    const {steps} = talktrack;
    const currentStep = steps.findIndex(({ order }) => order === parseInt(stepIdentifier));
    const nextTalkTrackStep = steps[currentStep + 1];
    if (!nextTalkTrackStep)
      return;
    const {order} = nextTalkTrackStep;
    dispatch(setActiveStep(talkTrackIdentifier, order));
  };
  const currentTalkTrackWorkflow = getActiveTalkTrackWorkflow(talkTracks, activeTalkTrackID);
  const handleTabChange = (talkTrackUUID) => dispatch(setTalkTrackActive(talkTrackUUID));
  const handleTalkTrackAction = (talkTrackIdentifier) => {
    const talkTrack = searchTalkTrackByIdentifier(talkTrackIdentifier);
    if (talkTrack)
      return;
    dispatch(initTalkTrack(talkTrackIdentifier))
  };

  const rootTalkTrack = "intro-123";
  const deploymentID = "callworkflow-2f8501bf";
  const [shouldDispatchRootTalkTrack, setShouldDispatchRootTalkTrack] = useState(true);
  const [showPostTaskModal, setShowPostTaskModal] = useState(false);
  const handleCloseShowPostTaskModal = () => setShowPostTaskModal(false);

  useEffect(() => dispatch(getDeploymentId()), []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if ( Array.isArray(talkTracks) && !talkTracks.length && shouldDispatchRootTalkTrack){
      dispatch(initTalkTrack(rootTalkTrack));
      setShouldDispatchRootTalkTrack(false);
    }
  }, [talkTracks, setShouldDispatchRootTalkTrack, dispatch, shouldDispatchRootTalkTrack]);

  useEffect(() => {
    setActiveTalkTrackID(getActiveTalkTrackID(talkTracks));
  }, [talkTracks, setActiveTalkTrackID]);

  useEffect(() => dispatch(fetchActiveTalkTracks()), []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isAutomaticState) {
      const interval = setInterval(() => dispatch(fetchTasks()), 500);
      return () => clearInterval(interval);
    }
    return () => {};
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!dispatch || !deploymentID || !Array.isArray(activeWorkflows)) return;
    const workflow = activeWorkflows.find((workflowItem) => workflowItem.includes(deploymentID));
    if (workflow) return;
    dispatch(initWorkflow(deploymentID));
  }, [deploymentID, dispatch, activeWorkflows]);

  if (areDeploymentsUnavailable)
    return <Typography>There are no deployments available</Typography>;

  return (
    <div className={classes.app}>
      <CssBaseline />
      <SideBar
        onMenuItemClicked={(item) => console.log("Menu item clicked: ", item)}
        logo="prism.svg"
        menuItems={[{ id: "1", isActive: true, icon: faCommentAlt }]}
        activeMenuItemId="1"
      />
      <Pane>
        <Tray className={classes.tray1}>
          <CallerInfo callerName="John Doe" deploymentID={deploymentID} />
        </Tray>
        <Tray className={classes.tray2}>
            <TalkTrack onTabChange={handleTabChange}
                       onActionSelected={handleTalkTrackAction}
                       onSkip={handleTalkTrackContinue}
                       activeTalkTrackID={activeTalkTrackID}
                       className={classes.talkTracks}
                       talkTrackItems={talkTracks}
                       onContinue={handleTalkTrackContinue}
            />
        </Tray>
        <Tray className={classes.tray3}>
          <PostTaskModal open={showPostTaskModal} handleClose={handleCloseShowPostTaskModal} workflowID={currentTalkTrackWorkflow} />
          <Notes />
          <InformationForm workflowID={currentTalkTrackWorkflow} />
        </Tray>
      </Pane>
    </div>
  );
}

export default App;
