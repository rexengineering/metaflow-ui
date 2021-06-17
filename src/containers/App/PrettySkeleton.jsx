import React, { Fragment } from "react";
import { Skeleton } from "@material-ui/lab";
import { makeStyles, Button, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  leadingWrapper: {
    margin: theme.spacing(3, 0),
  },
  finalWrapper: {
    marginBottom: theme.spacing(3),
  },
  skeleton: {
    backgroundColor: theme.palette.grey[600],
  },
}));

function PrettySkeleton() {
  const classes = useStyles();

  return (
    <>
      <div>
        <Skeleton height={19} animation={false} className={classes.skeleton} />
        <div className={classes.leadingWrapper}>
          <Skeleton
            height={50}
            animation={false}
            className={classes.skeleton}
          />
        </div>
        <div className={classes.leadingWrapper}>
          <Divider />
        </div>
        {Array.from("12345").map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={index}>
            <Skeleton
              height={19}
              animation={false}
              className={classes.skeleton}
            />
            <Skeleton
              height={60}
              animation={false}
              className={classes.skeleton}
            />
          </Fragment>
        ))}
      </div>
      <div className={classes.finalWrapper}>
        <Button variant="contained" color="primary" fullWidth disabled>
          Placeholder
        </Button>
      </div>
    </>
  );
}

export default PrettySkeleton;
