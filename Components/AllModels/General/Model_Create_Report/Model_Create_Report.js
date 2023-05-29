import { Typography, TextField, Button } from "@mui/material";
import classes from "./Model_Create_Report.module.scss";
import { useState } from "react";

import { enqueueSnackbar } from "notistack";
import { create_report_request } from "../../../../services/pages/index_requests";
import { showSnackBar } from "../../../../next-utils/helper_functions";
const Model_Create_Report = (props) => {
  const [description, setDescription] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await create_report_request(props.taskId, { description });

      if (result.status === "success") {
        showSnackBar(
          enqueueSnackbar,
          "Successfully! Created a report of the task.",
          "success"
        );
      }
    } catch (error) {
      if (error.status === "error")
        return showSnackBar(enqueueSnackbar, error.message, "error");
      return showSnackBar(
        enqueueSnackbar,
        "Failed to create the report",
        "error"
      );
    }
  };
  return (
    <form className={classes["Form"]} onSubmit={onSubmit}>
      <Typography
        className={classes["Form__Heading"]}
        variant="h5"
        component={"h5"}
      >
        Create a report
      </Typography>
      <Typography
        className={classes["Form__Heading"]}
        variant="body1"
        component={"p"}
      >
        Create and send report to your admin
      </Typography>
      <TextField
        type="text"
        required
        multiline
        rows={4}
        variant="standard"
        placeholder="Enter the description for the report"
        label={"Description"}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Button variant="contained" type="submit">
        Create a report
      </Button>
    </form>
  );
};

export default Model_Create_Report;
