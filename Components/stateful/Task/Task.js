import { useState } from "react";
import { SmallSelect } from "../../Input/TextInput/TextInput";
import React from "react";

import Profile_Report_Task from "../../stateless/Profile_Report_Task/Profile_Report_Task";
import { Avatar, Button, Typography } from "@mui/material";
import { green, grey, red, teal, yellow } from "@mui/material/colors";
import { SendOutlined } from "@mui/icons-material";
import { Select, MenuItem } from "@mui/material";
const Task = (props) => {
  const [currentLevel, setLevel] = useState(0);
  const currentTask = props.tasks[currentLevel];

  const [isToggle, setToggle] = useState(false);

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const getPriorityColor = (priority) => {
    if (priority === "important") return yellow[700];
    if (priority === "un-important") return green[700];
    if (priority === "critical") return red[700];
  };

  const options = new Array(props.tasks.length).fill("level").map((el, i) => {
    return {
      text: el + " " + (props.tasks.length - i),
      color: props.tasks[currentLevel].taskType,
    };
  });

  const generateDate = (date) => {
    return new Date(date).toLocaleString();
  };
  return (
    <div className={classes.Task} onClick={() => setToggle(true)}>
      {!isToggle && (
        <div className={classes.Task__Small}>
          <div className={classes.Task__Small__Image}>
            <Avatar
              src={`/storage/images/profilePicture/${props.profilePicture}`}
              alt={props.profilePicture}
            />
          </div>
          <Typography
            className={[classes.Task__Title]}
            variant="body1"
            component={"h6"}
            color={grey[900]}
          >
            {currentTask.heading}
          </Typography>
          <Typography variant="body1" component={"body1"} color={grey[700]}>
            {generateDateFromString(currentTask.assignedOn)}
          </Typography>
          <Typography
            variant="body1"
            component={"body1"}
            color={
              Date.now() > new Date(currentTask.deadline).getTime()
                ? red[500]
                : green[500]
            }
          >
            {generateDateFromString(currentTask.deadline)}
          </Typography>
          <Typography
            style={{ textTransform: "capitalize" }}
            fontWeight={600}
            color={getPriorityColor(currentTask.priority)}
          >
            {currentTask.priority}
          </Typography>
          {/* <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            size="small"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10} color={green[900]}>
              Ten
            </MenuItem>
          </Select> */}
        </div>
      )}
      {isToggle && (
        <div className={classes.Task__Large}>
          <div className={classes.Task__Large__Top}>
            <div className={classes.Task__Large__Profile}>
              <Profile_Report_Task
                src={props.profilePicture}
                fullName={props.assignBy.fullName}
                assignedOn={currentTask.assignedOn}
                deadline={currentTask.deadline}
              />
            </div>
            <SmallSelect onChange={setLevel} options={options}></SmallSelect>
          </div>

          <Typography
            className={[classes.Task__Large__Heading]}
            variant="h5"
            fontWeight={"600"}
            component={"h5"}
            color={grey[900]}
          >
            {currentTask.heading}
          </Typography>

          <Typography
            className={[classes.Task__Large__Description]}
            variant="body1"
            component={"p"}
            color={grey[700]}
          >
            {currentTask.description}
          </Typography>
        </div>
      )}

      {isToggle && (
        <div className={classes.Task__Bottom}>
          <Button
            variant="contained"
            startIcon={<SendOutlined />}
            onClick={() => {
              props.sendReport(true);

              props.setTaskAdminId(props.assignBy.id);
              props.setTaskId(props.id);
            }}
          >
            Send Report
          </Button>
        </div>
      )}
      {isToggle && (
        <ArrowUp
          className={classes.ArrowUp}
          style={{ fontSize: "2rem", textAlign: "center", width: "100%" }}
          onClick={(e) => {
            e.stopPropagation();
            setToggle(false);
          }}
        />
      )}
    </div>
  );
};

export default Task;
