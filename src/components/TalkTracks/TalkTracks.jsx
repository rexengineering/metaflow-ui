import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {
    Card, CardContent, CardHeader, makeStyles, Tab, Tabs,
} from "@material-ui/core";
import {Skeleton, TabContext, TabPanel} from "@material-ui/lab";
import Workflow from "../Workflow";


const useStyles = makeStyles((theme) => ({
    card: {
        padding: theme.spacing(2, 3.5, 0),
    },
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

function TalkTracks({ talkTrackWorkflows, headerAction, activeTalkTrackID, isATalkTrackBeingFetched, className }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(activeTalkTrackID);
  const handleChange = (event, newValue) => setValue(newValue);

  useEffect(() => {
      setValue(activeTalkTrackID);
  }, [activeTalkTrackID, setValue])

    return (
    <Card>
      <CardHeader className={classes.card} title="Talk Tracks" action={headerAction} />
      <CardContent>
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

                          { Array.isArray(talkTrackWorkflows) &&
                          talkTrackWorkflows.map(({iid: workflowID}) => (
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
                          {Array.isArray(talkTrackWorkflows) &&
                          talkTrackWorkflows.map(
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
      </CardContent>
    </Card>
  );
}

TalkTracks.propTypes = {
  talkTrackWorkflows: PropTypes.arrayOf(PropTypes.shape({
      iid: PropTypes.string.isRequired,
      isTalkTrack: PropTypes.bool.isRequired,
  })).isRequired,
  headerAction: PropTypes.node,
  isATalkTrackBeingFetched: PropTypes.bool.isRequired,
  activeTalkTrackID: PropTypes.string.isRequired,
  className: PropTypes.string,
};

TalkTracks.defaultProps = {
  headerAction: undefined,
};

export default TalkTracks;
