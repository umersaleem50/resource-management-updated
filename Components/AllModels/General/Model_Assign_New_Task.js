import { Divider, Typography, TextField, Button } from "@mui/material";
import classes from "./Model_Assign_New_Task.module.scss";
import CustomSelectInput from "../../Input/SelectInput/CustomSelectInput";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { taskPriorities } from "../../../Dev-Data/branches";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { object } from "prop-types";
const Model_Assign_New_Task = ({ data }) => {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form className={classes["Form"]}>
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

        <DateTimePicker label="Choose a deadline" required />
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
