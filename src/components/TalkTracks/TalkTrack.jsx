import React, {useEffect} from "react";
import {
  Button,
  IconButton,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-solid-svg-icons/faPlus";
import PropTypes from "prop-types";
import clsx from "clsx";
import { talkTrackItemShape } from "../../utils/shapes";
import ActionCard from "../ActionCard";
import TalkTrackItem from "./TalkTrackItem";
import TabPanel from "../TabPanel";

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
  stepsContainer: {
    maxHeight: theme.spacing(70),
    padding: theme.spacing(0, 2),
    overflowY: "scroll",
  },
  talkTrackStep: {
    marginBottom: theme.spacing(3),
  },
  title: {
    marginTop: theme.spacing(1),
  }
}));

function TalkTrack({ talkTrackItems, activeTalkTrackID, onSkip, onActionSelected, onTabChange, className }) {
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
    <ActionCard className={clsx(classes.paper, className)}>
      <section className={classes.header}>
        <Typography variant="h4" className={classes.title}>Talk track</Typography>
        <IconButton type="button" color="default"  className={classes.addButton}>
          <FontAwesomeIcon icon={faPlus} />
        </IconButton>
      </section>
      <section className={classes.talkTracks}>
        <Tabs
          classes={{ indicator: classes.tabsIndicator }}
          className={classes.tabs}
          onChange={handleChange}
          orientation="vertical"
          value={value}
        >
          {Array.isArray(talkTrackItems) &&
            talkTrackItems.map(({ identifier, title }) => (
              <Tab
                key={identifier}
                label={title}
                value={identifier}
              />
            ))}
        </Tabs>
        <section className={classes.tabsPanel}>
          {Array.isArray(talkTrackItems) &&
            talkTrackItems.map(
              ({
                identifier,
                steps,
              }) => (
                <TabPanel
                  key={identifier}
                  index={`${value}`}
                  value={identifier}
                >
                  <section className={classes.stepsContainer}>
                    {
                      steps.map(({identifier, title, speech, actions, active}) => (
                          <TalkTrackItem
                              key={identifier}
                              title={title}
                              speech={speech}
                              actions={actions}
                              onSkip={onSkip}
                              identifier={identifier}
                              onActionSelected={onActionSelected}
                              active={active}
                              className={classes.talkTrackStep}
                          />
                      ))
                    }
                  </section>
                </TabPanel>
              )
            )}
        </section>
      </section>
    </ActionCard>
  );
}

TalkTrack.defaultProps = {
  className: "",
}

TalkTrack.propTypes = {
  talkTrackItems: PropTypes.arrayOf(PropTypes.shape(talkTrackItemShape))
    .isRequired,
  className: PropTypes.string,
  activeTalkTrackID: PropTypes.string.isRequired,
  onSkip: PropTypes.func.isRequired,
  onActionSelected: PropTypes.func.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default TalkTrack;
