import { Avatar, makeStyles, Tab, Tabs, Typography } from "@material-ui/core";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Info from "./Info";
import History from "./History";
import {
  customerInfoShape,
  managerInfoShape,
  nextStepsShape,
  notesShape,
  tagsShape,
  userTypesShape,
} from "../../utils/shapes";
import TabPanel from "../TabPanel";
import fontAwesomeIcon from "../../utils/propsValidators";

const useCustomerStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.grey["800"],
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
    color: theme.palette.common.white,
  },
  title: {
    margin: theme.spacing(3, 0),
  },
  avatar: {
    marginBottom: theme.spacing(3),
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.light,
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  customerLabel: {
    fontSize: theme.spacing(2),
    fontWeight: "lighter",
    marginTop: theme.spacing(0.3),
    color: theme.palette.grey["400"],
  },
  tabsContainer: {
    marginTop: theme.spacing(3),
  },
  tab: {
    textTransform: "capitalize",
    color: theme.palette.common.white,
  },
  tabPanel: {
    paddingTop: theme.spacing(2),
  },
}));

function Customer({
  onTabsChange,
  customerHistory,
  months,
  customerInfo,
  managerInfo,
  nextSteps,
  notes,
  userTypes,
  tags,
}) {
  const styles = useCustomerStyles();
  const [activeTabId, setActiveTabId] = useState("info");
  const handleTabChange = (event, newValue) => {
    setActiveTabId(newValue);
    onTabsChange(newValue);
  };
  return (
    <section className={styles.root}>
      <Typography className={styles.title} variant="body1">
        Customer
      </Typography>
      <Avatar className={styles.avatar} />
      <Typography variant="body1">John Doe</Typography>
      <Typography className={styles.customerLabel} variant="body2">
        Customer
      </Typography>
      <section className={styles.tabsContainer}>
        <Tabs value={activeTabId} onChange={handleTabChange}>
          <Tab className={styles.tab} label="Info" value="info" />
          <Tab className={styles.tab} label="History" value="history" />
        </Tabs>
        <TabPanel className={styles.tabPanel} value={activeTabId} index="info">
          <Info
            customerInfo={customerInfo}
            managerInfo={managerInfo}
            nextSteps={nextSteps}
            notes={notes}
            tags={tags}
            onSubmit={() => {}}
            userTypes={userTypes}
          />
        </TabPanel>
        <TabPanel
          className={styles.tabPanel}
          value={activeTabId}
          index="history"
        >
          <History
            onHistoryItemSelected={() => {}}
            historyItems={customerHistory}
            months={months}
          />
        </TabPanel>
      </section>
    </section>
  );
}

Customer.propTypes = {
  customerInfo: customerInfoShape.isRequired,
  managerInfo: managerInfoShape.isRequired,
  nextSteps: nextStepsShape.isRequired,
  notes: notesShape.isRequired,
  userTypes: userTypesShape.isRequired,
  tags: tagsShape.isRequired,
  onTabsChange: PropTypes.func.isRequired,
  months: PropTypes.arrayOf(PropTypes.string).isRequired,
  customerHistory: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      date: PropTypes.string,
      icon: fontAwesomeIcon,
      color: PropTypes.string,
    })
  ).isRequired,
};

export default Customer;
