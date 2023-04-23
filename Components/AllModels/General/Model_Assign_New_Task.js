import { Divider, Typography, TextField, Button } from "@mui/material";
import classes from "./Model_Assign_New_Task.module.scss";
import CustomSelectInput from "../../Input/SelectInput/CustomSelectInput";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { taskPriorities } from "../../../Dev-Data/branches";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { object } from "prop-types";
import { assign_task_request } from "../../../services/pages/profile";
import { showSnackBar } from "../../../next-utils/helper_functions";
import { enqueueSnackbar } from "notistack";
import dayjs from "dayjs";
const Model_Assign_New_Task = ({ data, closeModel }) => {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState(dayjs("2022-04-17"));
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const results = await assign_task_request(
        {
          heading,
          description,
          priority: priority.toLowerCase(),
          deadline,
        },
        data.id
      );
      console.log(priority);
      if (results.status === "success") closeModel();
      showSnackBar(enqueueSnackbar, "Successfully Assigned task!", "success");
    } catch (err) {
      console.log(err);
      if (err.status === "error") {
        showSnackBar(enqueueSnackbar, err.message, "error");
        return;
      }
      showSnackBar(
        enqueueSnackbar,
        "Something went wrong while assiging task!",
        "error"
      );
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form className={classes["Form"]} onSubmit={onSubmit}>
        <Typography
          className={classes["Form__Heading"]}
          variant="h5"
          component={"h5"}
        >
          Assign the task
        </Typography>
        <Typography
          className={classes["Form__Heading"]}
          variant="body1"
          component={"p"}
        >
          Assign the task to your team member, you can reassign the task through
          report
        </Typography>
        <Divider style={{ marginBottom: "30px", marginTop: "20px" }} />
        <CustomSelectInput
          anyValue={false}
          initalValue={priority}
          setInputValue={setPriority}
          options={taskPriorities}
          required
        />

        <DateTimePicker
          label="Choose a deadline"
          required
          value={deadline}
          onChange={(value) => setDeadline(value)}
        />
        <TextField
          type="text"
          required
          variant="standard"
          placeholder="Type a heading for note"
          label={"Heading"}
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        />
        <TextField
          type="text"
          required
          variant="standard"
          placeholder="Type a description for note"
          label={"Description"}
          value={description}
          multiline
          rows={5}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </LocalizationProvider>
  );
};

Model_Assign_New_Task.propTypes = {
  data: object,
};

export default Model_Assign_New_Task;
