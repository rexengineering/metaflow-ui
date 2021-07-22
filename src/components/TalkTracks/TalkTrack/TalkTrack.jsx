import React, {useEffect} from "react";
import {
  IconButton,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-solid-svg-icons/faPlus";
import PropTypes from "prop-types";
import Workflow from "../../Workflow";
import {TabContext, TabPanel} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  addButton: {
    position: "absolute",
    top: 0,
    right: 0,
    color: theme.palette.common.black,
  },
  talkTracks: {
    marginTop: theme.spacing(5),
    display: "flex",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: "50%",
    flexGrow: 1,
  },
  tabsPanel: {
    width: "100%",
    flexGrow: 1,
  },
  tabsIndicator: {
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    marginTop: theme.spacing(1),
  }
}));

function TalkTrack({ talkTrackItems, activeTalkTrackID, onSkip, onActionSelected, onTabChange, onContinue, className }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(activeTalkTrackID);
  const handleChange = (event, newValue) => {
    onTabChange(newValue);
    setValue(newValue);
  };

  useEffect(() => {
    setValue(activeTalkTrackID);
  }, [activeTalkTrackID, setValue])

  return (
    <section className={className}>
      <section className={classes.header}>
        <Typography variant="h4" className={classes.title}>Talk track</Typography>
        <IconButton type="button" color="default"  className={classes.addButton}>
          <FontAwesomeIcon icon={faPlus} />
        </IconButton>
      </section>
      <section className={classes.talkTracks}>
        <TabContext value={value}>
          <Tabs
              classes={{ indicator: classes.tabsIndicator }}
              className={classes.tabs}
              onChange={handleChange}
              orientation="vertical"
              value={value}
          >
            {Array.isArray(talkTrackItems) &&
            talkTrackItems.map((workflowID) => (
                <Tab
                    key={`tab-${workflowID}`}
                    label={workflowID}
                    value={workflowID}
                />
            ))}
          </Tabs>
          <section className={classes.tabsPanel}>
            {Array.isArray(talkTrackItems) &&
            talkTrackItems.map(
                (workflowID) => (
                    <TabPanel
                        key={workflowID}
                        index={`${value}`}
                        value={workflowID}
                    >
                      <Workflow workflowID={workflowID} />
                    </TabPanel>
                )
            )}
          </section>
        </TabContext>
      </section>
    </section>
  );
}

TalkTrack.defaultProps = {
  className: "",
}

TalkTrack.propTypes = {
  talkTrackItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  activeTalkTrackID: PropTypes.string.isRequired,
  onSkip: PropTypes.func.isRequired,
  onActionSelected: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default TalkTrack;
