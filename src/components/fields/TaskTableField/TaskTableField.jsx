import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@material-ui/core";

function parseTableData(data) {
  try {
    return JSON.parse(data);
  } catch (error) {
    return { body: [["There was a problem reading the table data."]] };
  }
}

function TaskTableField({ data }) {
  const [info, setInfo] = useState(parseTableData(data));

  useEffect(() => {
    setInfo(parseTableData(data));
  }, [data]);

  const heading = info?.heading;
  const body = info?.body;

  return (
    <TableContainer component={Paper}>
      <Table>
        {Array.isArray(heading) && (
          <TableHead>
            <TableRow>
              {heading.map((item) => (
                <TableCell key={item}>{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        {Array.isArray(body) && (
          <TableBody>
            {body.map(
              (row) =>
                Array.isArray(row) && (
                  <TableRow key={JSON.stringify(row)}>
                    {row.map((item) => (
                      <TableCell key={item}>{item}</TableCell>
                    ))}
                  </TableRow>
                )
            )}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}

TaskTableField.propTypes = {
  data: PropTypes.string.isRequired,
};

export default TaskTableField;
