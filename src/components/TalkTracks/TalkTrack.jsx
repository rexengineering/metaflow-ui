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
    top: -5,
    right: 0,
    background: theme.palette.grey["800"],
    color: theme.palette.common.white,
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
        <Typography variant="h4">Talk track</Typography>
        <IconButton className={classes.addButton}>
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
                title,
                speech,
                actions,
                active,
              }) => (
                <TabPanel
                  key={identifier}
                  index={`${value}`}
                  value={identifier}
                >
                  <TalkTrackItem
                    title={title}
                    speech={speech}
                    actions={actions}
                    onSkip={onSkip}
                    identifier={identifier}
                    onActionSelected={onActionSelected}
                    active={active}
                  />
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
