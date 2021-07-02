import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/pro-regular-svg-icons";
import PropTypes from "prop-types";
import HistoryItem from "./HistoryItem";

const useStyles = makeStyles((theme) => ({
  accordion: {
    background: theme.palette.grey["800"],
    boxShadow: "none",
    borderBottomWidth: theme.spacing(0.125),
    borderBottomColor: theme.palette.grey["400"],
    borderBottomStyle: "solid",
    color: theme.palette.grey["400"],
  },
  historyItems: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "flex-start",
  },
}));

function History({ historyItems, months, onHistoryItemSelected }) {
  const classes = useStyles();
  return (
    <div>
      {Array.isArray(months) &&
        months.map((month) => (
          <Accordion key={month} className={classes.accordion}>
            <AccordionSummary
              expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
            >
              <Typography variant="body2">{month}</Typography>
            </AccordionSummary>
            <AccordionDetails
              className={classes.historyItems}
              data-testid="item"
            >
              {Array.isArray(historyItems) &&
                historyItems.map((historyItem) => {
                  const { date, color, label, icon } = historyItem;
                  return (
                    <HistoryItem
                      key={date}
                      color={color}
                      date={date}
                      label={label}
                      icon={icon}
                      onClick={() =>
                        onHistoryItemSelected({ historyItem, month })
                      }
                    />
                  );
                })}
            </AccordionDetails>
          </Accordion>
        ))}
    </div>
  );
}

History.propTypes = {
  historyItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      date: PropTypes.string,
      icon: PropTypes.node,
      color: PropTypes.string,
    })
  ).isRequired,
  months: PropTypes.arrayOf(PropTypes.string).isRequired,
  onHistoryItemSelected: PropTypes.func.isRequired,
};

export default History;
