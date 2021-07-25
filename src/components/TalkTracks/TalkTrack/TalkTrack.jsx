import React, {useEffect} from "react";
import {
  makeStyles,
  Tab,
  Tabs,
} from "@material-ui/core";
import PropTypes from "prop-types";
import Workflow from "../../Workflow";
import {Skeleton, TabContext, TabPanel} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  talkTracks: {
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
  tab: {
   textAlign: "left",
  },
  tabLoading: {
   padding: theme.spacing(0, 10, 0, 1.5),
  },
}));

function TalkTrack({ talkTrackItems, activeTalkTrackID, isATalkTrackBeingFetched, className }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(activeTalkTrackID);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setValue(activeTalkTrackID);
  }, [activeTalkTrackID, setValue])

  return (
    <section className={className}>
      <section className={classes.talkTracks}>
        <TabContext value={value}>
          <Tabs
              classes={{ indicator: classes.tabsIndicator }}
              className={classes.tabs}
              onChange={handleChange}
              orientation="vertical"
              value={value}
          >

            { Array.isArray(talkTrackItems) &&
                talkTrackItems.map(({iid: workflowID}) => (
                    <Tab
                        className={classes.tab}
                        key={`tab-${workflowID}`}
                        label={workflowID}
                        value={workflowID}
                    />
            ))}

            { isATalkTrackBeingFetched &&
                (<div className={classes.tabLoading}>
                  <Skeleton height={30} />
                </div>)
            }

          </Tabs>
          <section className={classes.tabsPanel}>
            {Array.isArray(talkTrackItems) &&
            talkTrackItems.map(
                ({iid: workflowID}) => (
                    <TabPanel
                        key={workflowID}
                        index={`${value}`}
                        value={workflowID}
                    >
                      <Workflow submitButtonText="continue" workflowID={workflowID} />
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
  isATalkTrackBeingFetched: PropTypes.bool.isRequired,
};

export default TalkTrack;
