import { BtnFull } from "../../Input/Buttons/Button";
import {
  TextInputLabel,
  MultiTextBox,
  SelectInput,
} from "../../Input/TextInput/TextInput";
import { Heading_Large } from "../../Typography/Typography";
import { useRef } from "react";
import axios from "axios";
import { showNofication } from "../../stateless/Notification/Notification";

const Reassign_Task_Model = (props) => {
  const headingRef = useRef();
  const descriptionRef = useRef();
  const deadlineRef = useRef();
  const taskTypeRef = useRef();

  const submitTask = async (e) => {
    e.preventDefault();
    const heading = headingRef.current.value;
    const description = descriptionRef.current.value;
    const taskType = taskTypeRef.current.textContent;
    const deadline = deadlineRef.current.value;
    try {
      const task = await axios({
        url: `/api/task/reassign/${props.taskId}`,
        method: "PATCH",
        data: {
          heading,
          description,
          taskType,
          deadline,
        },
      });
      if (task)
        return showNofication(
          "Successfully reassigned the task",
          "success",
          () => props.closeModel(true)
        );
    } catch (error) {
      showNofication(error?.response?.data?.message, "error");
    }
  };
  return (
    <form onSubmit={submitTask}>
      <Heading_Large>Re-Assign Task</Heading_Large>
      <SelectInput
        category={["critical", "important", "un-important"]}
        ref={taskTypeRef}
      ></SelectInput>
      <TextInputLabel
        type="datetime-local"
        label="Select deadline"
        ref={deadlineRef}
      ></TextInputLabel>
      <TextInputLabel ref={headingRef} label="Heading"></TextInputLabel>
      <MultiTextBox ref={descriptionRef} label="Description"></MultiTextBox>

      <BtnFull>Assign Task</BtnFull>
    </form>
  );
};

export default Reassign_Task_Model;
