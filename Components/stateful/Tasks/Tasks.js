import Task from "../Task/Task";
import { Heading_Tiny, Paragraph } from "../../Typography/Typography";
import SendReportModel from "../../AllModels/dashboard/_send_report";
import Model from "../../stateless/Model/Model";
import classes from "./Tasks.module.scss";
import axios from "axios";
import { showNofication } from "../../stateless/Notification/Notification";
import Notification from "../../stateless/Notification/Notification";
import { useEffect, useState, useRef } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { io } from "socket.io-client";
import { Component } from "react";
import { createRef } from "react";

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
      console.log(
        this.props.userId === data.userId,
        this.props.userId,
        data.userId
      );
      if (props.userId === data.userId) {
        showNofication("Your admin assigned a new task for you", "success");
        this.fetchLatestTasks();
      }
    });
  }

  async fetchLatestTasks() {
    try {
      const tasks = await axios({ url: "/api/task", method: "GET" });
      const fetchedTaskArr = tasks.data.data;

      if (tasks) this.setState({ fetchTask: fetchedTaskArr.reverse() });
    } catch (error) {
      showNofication(
        error?.response?.data?.message ||
          "Something went wrong while fetching tasks.",
        "error"
      );
      console.log(error);
    }
  }

  async componentDidMount() {
    await this.fetchLatestTasks();
  }

  sendReportRequest = async (description) => {
    // console.log(
    //   "tasks.js line 32. ",
    //   seletedTaskAdminId,
    //   seletedTaskId,
    //   description
    // );

    if (
      this.state.selectedTaskAdminId === "" ||
      this.state.selectedTaskId === ""
    )
      return;
    try {
      const reportResult = await axios({
        url: `/api/reports/${this.state.selectedTaskAdminId}/${this.state.selectedTaskId}`,
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
          {" "}
          <Paragraph>You currently no task.</Paragraph>
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
        {this.state.isToggleReportModel && (
          <Model
            toggleModel={() => this.setState({ isToggleReportModel: false })}
          >
            <SendReportModel
              sendReportRequest={this.sendReportRequest}
              ref={this.reportDescriptionRef}
            ></SendReportModel>
          </Model>
        )}
        <div className={classes.Tasks__Top}>
          <Heading_Tiny bold="600">Your Tasks</Heading_Tiny>
        </div>

        <div className={classes.Tasks__Container}>
          <div className={classes.Tasks__Titles}>
            <Paragraph>Admin</Paragraph>
            <Paragraph>Description</Paragraph>
            <Paragraph>Assigned On</Paragraph>
            <Paragraph>Deadline</Paragraph>
            <Paragraph>Level</Paragraph>
          </div>

          {this.generateTasks(this.state.fetchTask, this.state.updatedTask)}
        </div>
      </div>
    );
  }
}

// ------------------------

export default Tasks;
