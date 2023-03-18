import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { showNofication } from "../../stateless/Notification/Notification";
import { io } from "socket.io-client";
const { BtnFull } = require("../../Input/Buttons/Button");
const {
  SelectInput,
  TextInputLabel,
  MultiTextBox,
} = require("../../Input/TextInput/TextInput");
const { Heading_Large } = require("../../Typography/Typography");

const AssignTaskModel = (props) => {
  const deadlineRef = useRef();
  const headingRef = useRef();
  const descriptionRef = useRef();
  const taskTypeRef = useRef();
  const socket = io("http://localhost:3000");

  useEffect(() => {
    (async () => {
      try {
        const tasks = await axios({ url: "/api/task", method: "GET" });
        console.log(tasks.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const submitTask = async (e) => {
    e.preventDefault();
    // console.log("working task assigning at _assign_task.js :8");
    // console.log(deadlineRef.current.value);
    // console.log({
    //   heading: headingRef.current.value,
    //   description: descriptionRef.current.value,
    //   deadline: new Date(deadlineRef.current.value),
    // });

    try {
      const task = await axios({
        url: `/api/task/${props.assignToId}`,
        method: "Post",
        data: {
          heading: headingRef.current.value,
          description: descriptionRef.current.value,
          deadline: new Date(deadlineRef.current.value),
          taskType: taskTypeRef.current.textContent,
        },
      });
      if (task) {
        props.toggleModel(false);
        showNofication("Task assigned Successfully!", "success", () => {
          // THIS WILL EMIT THE EVENT WITH THE USER ID TO WHOM THE TASK IS ASSIGNED
          console.log(task);
          socket.emit("task-assigned", {
            userId: task.data.data.assignTo,
          });
        });
      }
    } catch (error) {
      console.log(error);
      showNofication(
        error?.response?.data?.message ||
          "Something went wrong, Please try agiain later",
        "error"
      );
      console.log(error);
    }
    // socket.emit("task-assigned", { userId: "jfdjkfdjkfjdklj" });
    // showNofication("working button, event emitted", "success");
  };
  return (
    <form onSubmit={submitTask}>
      <Heading_Large>Assign a Task</Heading_Large>
      <SelectInput
        category={["critical", "important", "un-important"]}
        ref={taskTypeRef}
      ></SelectInput>
      <TextInputLabel
        type="datetime-local"
        label="Select deadline"
        ref={deadlineRef}
      ></TextInputLabel>
      <TextInputLabel label="Heading" ref={headingRef}></TextInputLabel>
      <MultiTextBox label="Description" ref={descriptionRef}></MultiTextBox>
      <BtnFull>Submit</BtnFull>
    </form>
  );
};

export default AssignTaskModel;
