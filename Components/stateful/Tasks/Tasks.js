import Task from "../Task/Task";

import classes from "./Tasks.module.scss";
import axios from "axios";

import { Scrollbars } from "react-custom-scrollbars-2";
import { io } from "socket.io-client";
import { Component } from "react";
import { createRef } from "react";
import { showSnackBar } from "../../../next-utils/helper_functions";
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import { Search } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import { all_tasks_callback } from "../../../services/pages/index_requests";

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchTask: [],
      isToggleReportModel: false,
      selectedTaskId: "",
      selectedTaskAdminId: "",
      updatedTask: "",
    };

    this.socket = io("http://localhost:3000");

    this.reportDescriptionRef = createRef();

    this.socket.on("new-task", async (data) => {
      if (props.userId === data.userId) {
        showNofication("Your admin assigned a new task for you", "success");
        this.fetchLatestTasks();
      }
    });
  }

  /**
   * this method will return only the task that have value in the heading
    * it will only filter those tasks, whose task [] will include the value in their heading
    @argument value [String] value of the search input
    @returns Return filtered tasks
  */

  searchTaskHandler(value) {
    if (value === "") this.fetchLatestTasks();

    const searchedTask = this.state.fetchTask.filter((mainTask, i) => {
      return (
        mainTask.tasks &&
        mainTask.tasks.filter((task, i) => {
          return task.heading.toLowerCase().includes(value);
        }).length
      );
    });
    this.setState({ fetchTask: searchedTask });
  }

  async fetchLatestTasks() {
    try {
      const tasks = await all_tasks_callback();
      const fetchedTaskArr = tasks.data;
      if (tasks) {
        this.setState({
          fetchTask: fetchedTaskArr.reverse(),
        });
      }
    } catch (error) {
      showSnackBar(this.props.snackBar, error.message, "error");
    }
  }

  async componentDidMount() {
    await this.fetchLatestTasks();
  }

  sendReportRequest = async (description) => {
    if (
      this.state.selectedTaskAdminId === "" ||
      this.state.selectedTaskId === ""
    )
      return;
    try {
      const reportResult = await axios({
        url: `/api/v1/reports/${this.state.selectedTaskAdminId}/${this.state.selectedTaskId}`,
        method: "POST",
        data: {
          description: description,
        },
      });
      if (reportResult) {
        this.setState({
          isToggleReportModel: false,
        });
        showNofication("Report sent successfully.", "success");
      }
    } catch (error) {
      showNofication(
        error?.response?.data?.message || "Something went wrong.",
        "error"
      );
    }
  };

  generateTasks(tasks, taskId) {
    if (!tasks || !tasks.length) {
      return (
        <div className={classes["Default-Task"]}>
          <Typography variant="body1" component={"p"}>
            You have currently no task.
          </Typography>
        </div>
      );
    }
    return (
      <Scrollbars autoHeight autoHeightMin={400} autoHeightMax={400}>
        {tasks.map((el, i) => {
          return (
            <Task
              key={i}
              profilePicture={el?.assignBy?.profilePicture}
              tasks={el.tasks}
              assignBy={el.assignBy}
              sendReport={() => this.setState({ isToggleReportModel: true })}
              setTaskAdminId={(id) =>
                this.setState({ selectedTaskAdminId: id })
              }
              setTaskId={() => this.setState({ selectedTaskId: el._id })}
            ></Task>
          );
        })}
      </Scrollbars>
    );
  }

  render() {
    return (
      <div className={classes.Tasks}>
        <div className={classes.Tasks__Top}>
          <Typography
            variant="h6"
            component={"h6"}
            color={grey[700]}
            style={{ textTransform: "uppercase" }}
          >
            Your Tasks
          </Typography>

          <TextField
            id="input-with-icon-textfield"
            placeholder="Search task"
            sx={{ width: 250 }}
            onChange={(e) => {
              if (e.target.value === "") this.fetchLatestTasks();
            }}
            onKeyDown={(e) => {
              if (e.code === "Enter") this.searchTaskHandler(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        </div>

        <div
          className={classes.Tasks__Container}
          // style={{ backgroundColor: blue[50] }}
        >
          <div className={classes.Tasks__Titles}>
            <Typography color={grey[500]}>Admin</Typography>
            <Typography color={grey[500]}>Description</Typography>
            <Typography color={grey[500]}>Assigned On</Typography>
            <Typography color={grey[500]}>Deadline</Typography>
            <Typography color={grey[500]}>Level</Typography>
          </div>

          {this.generateTasks(this.state.fetchTask, this.state.updatedTask)}
        </div>
      </div>
    );
  }
}

// ------------------------

export default Tasks;
