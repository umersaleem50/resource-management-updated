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
import PerfectScrollbar from "perfect-scrollbar";
const Tasks = (props) => {
  const [fetchTask, setFetchTask] = useState([]);
  const [isToggleReportModel, setToggleReportModel] = useState(false);
  const [seletedTaskId, setTaskId] = useState("");
  const [seletedTaskAdminId, setTaskAdminId] = useState("");
  const reportDescriptionRef = useRef();
  const requestTasks = async () => {};

  useEffect(() => {
    (async () => {
      try {
        const tasks = await axios({ url: "/api/task", method: "GET" });

        setFetchTask(tasks.data.data);
      } catch (error) {
        // showNofication("Something went wrong in getting tasks.", "error");
        console.log(error);
      }
    })();

    // ps.update();
  }, []);

  const sendReportRequest = async (description) => {
    // console.log(
    //   "tasks.js line 32. ",
    //   seletedTaskAdminId,
    //   seletedTaskId,
    //   description
    // );
    if (seletedTaskAdminId === "" || seletedTaskId === "") return;
    try {
      const sendReportRequest = await axios({
        url: `/api/reports/${seletedTaskAdminId}/${seletedTaskId}`,
        method: "POST",
        data: {
          description: description,
        },
      });
      if (sendReportRequest) {
        showNofication("Report sent successfully.", "success", () =>
          setToggleReportModel(false)
        );
      }
    } catch (error) {
      // console.log("this is error", error);
      showNofication(
        error?.response?.data?.message || "Something went wrong.",
        "error"
      );
    }
  };

  const generateTasks = (tasks) => {
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
              sendReport={setToggleReportModel}
              setTaskAdminId={setTaskAdminId}
              setTaskId={() => setTaskId(el._id)}
            ></Task>
          );
        })}
      </Scrollbars>
    );
  };

  return (
    <div className={classes.Tasks}>
      {isToggleReportModel && (
        <Model toggleModel={setToggleReportModel}>
          <SendReportModel
            sendReportRequest={sendReportRequest}
            ref={reportDescriptionRef}
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
        {/* <Scrollbars autoHeight autoHeightMin={400}> */}
        {generateTasks(fetchTask)}
        {/* </Scrollbars> */}
        {/* <div className={classes.Tasks__tasks}></div> */}
      </div>
    </div>
  );
};

export default Tasks;
