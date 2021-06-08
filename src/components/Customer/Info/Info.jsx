import {
  Button,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React from "react";
import {
  string as yupString,
  number as yupNumber,
  object as yupObject,
} from "yup";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import AccountManagerInfo from "./AccountManagerInfo";
import NextSteps from "./NextSteps";
import Notes from "./Notes";
import Tags from "./Tags";
import Address from "./Address";
import {
  customerInfoShape,
  managerInfoShape,
  nextStepsShape,
  notesShape,
  userTypesShape,
  tagsShape,
} from "../../../utils/shapes";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  margin: {
    margin: theme.spacing(1.5, 0),
  },
}));

const infoValidationSchema = yupObject().shape({
  name: yupString().required(),
  email: yupString().required(),
  phone: yupNumber().required(),
  mobile: yupNumber().required(),
  type: yupString().required(),
});

function Info({
  customerInfo,
  managerInfo,
  nextSteps,
  notes,
  tags,
  userTypes,
  onSubmit,
}) {
  const { name, email, phone, mobile, type } = customerInfo;
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      name,
      email,
      phone,
      mobile,
      type,
    },
    onSubmit,
    validationSchema: infoValidationSchema,
  });
  return (
    <section className={classes.container}>
      <form onSubmit={formik.handleSubmit} className={classes.margin}>
        <TextField
          fullWidth
          label="Name"
          className={classes.margin}
          name="name"
          value={formik.values.name}
          error={Boolean(formik.touched.name && formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          onChange={formik.handleChange}
        />
        <TextField
          fullWidth
          label="Email"
          className={classes.margin}
          name="email"
          value={formik.values.email}
          error={Boolean(formik.touched.email && formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          onChange={formik.handleChange}
        />
        <TextField
          fullWidth
          label="Phone"
          className={classes.margin}
          name="phone"
          value={formik.values.phone}
          error={Boolean(formik.touched.phone && formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          onChange={formik.handleChange}
        />
        <TextField
          fullWidth
          label="Mobile"
          className={classes.margin}
          name="mobile"
          value={formik.values.mobile}
          error={Boolean(formik.touched.mobile && formik.errors.mobile)}
          helperText={formik.touched.mobile && formik.errors.mobile}
          onChange={formik.handleChange}
        />
        <Select
          fullWidth
          label="Type"
          variant="filled"
          className={classes.margin}
          name="type"
          value={formik.values.type}
          error={Boolean(formik.touched.type && formik.errors.type)}
          onChange={formik.handleChange}
        >
          {Array.isArray(userTypes) &&
            userTypes.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
        </Select>
        <Button type="submit" name="submit">
          Save
        </Button>
      </form>
      <Tags className={classes.margin} tagsItems={tags} />
      <Notes className={classes.margin} notes={notes} />
      <NextSteps
        onNextStepsSelected={() => {}}
        onAddNextStepsButtonClicked={() => {}}
        className={classes.margin}
        nextSteps={nextSteps}
      />
      <AccountManagerInfo
        name={managerInfo.name}
        phoneNumber={managerInfo.phoneNumber}
        roleType={managerInfo.role}
        onTransferCallClick={managerInfo.onTransferCallClick}
        className={classes.margin}
      />
      <Address className={classes.margin} address={managerInfo.address} />
    </section>
  );
}

Info.propTypes = {
  customerInfo: customerInfoShape.isRequired,
  managerInfo: managerInfoShape.isRequired,
  nextSteps: nextStepsShape.isRequired,
  notes: notesShape.isRequired,
  userTypes: userTypesShape.isRequired,
  tags: tagsShape.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Info;
