import Image from "next/legacy/image";
import { useState } from "react";
import { SmallSelect } from "../../Input/TextInput/TextInput";
import {
  Heading_Large,
  Heading_Tiny,
  Paragraph,
} from "../../Typography/Typography";
import { IoIosArrowUp as ArrowUp } from "react-icons/io";
import classes from "./Task.module.scss";
import { BtnFull } from "../../Input/Buttons/Button";
import { generateDateFromString } from "../../../next-utils/helper_functions";
import Profile_Report_Task from "../../stateless/Profile_Report_Task/Profile_Report_Task";
const Task = (props) => {
  const [currentLevel, setLevel] = useState(0);
  const currentTask = props.tasks[currentLevel];

  const [isToggle, setToggle] = useState(false);
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
            <Image
              src={`/storage/images/profilePicture/${props.profilePicture}`}
              width={40}
              height={40}
              alt={props.profilePicture}
            />
          </div>
          <Heading_Tiny className={[classes.Task__Title]}>
            {currentTask.heading}
          </Heading_Tiny>
          <Paragraph>
            {generateDateFromString(currentTask.assignedOn)}
          </Paragraph>
          <Paragraph
            color={
              Date.now() > new Date(currentTask.deadline).getTime()
                ? "var(--color-error)"
                : "var(--color-green)"
            }
            style={{
              fontWeight:
                Date.now() > new Date(currentTask.deadline).getTime() && "600",
            }}
          >
            {generateDateFromString(currentTask.deadline)}
          </Paragraph>
          <SmallSelect onChange={setLevel} options={options}></SmallSelect>
        </div>
      )}
      {isToggle && (
        <div className={classes.Task__Large}>
          <div className={classes.Task__Large__Top}>
            <div className={classes.Task__Large__Profile}>
              {/* <Image
                src={`/storage/images/profilePicture/${props.profilePicture}`}
                width={50}
                height={50}
                alt={props.profilePicture}
              />
              <div className={classes.Task__Large__deadlinebox}>
                <Paragraph>{props.assignBy.fullName}</Paragraph>
                <div className={classes.Task__Large__Deadline}>
                  <Paragraph>
                    {generateDate(currentTask.assignedOn)} -{" "}
                    {generateDate(currentTask.deadline)}
                  </Paragraph>
                </div>
              </div> */}
              <Profile_Report_Task
                src={props.profilePicture}
                fullName={props.assignBy.fullName}
                assignedOn={currentTask.assignedOn}
                deadline={currentTask.deadline}
              />
            </div>
            <SmallSelect onChange={setLevel} options={options}></SmallSelect>
          </div>
          <Heading_Large className={[classes.Task__Large__Heading]}>
            {currentTask.heading}
          </Heading_Large>
          <Paragraph className={[classes.Task__Large__Description]}>
            {currentTask.description}
          </Paragraph>
        </div>
      )}

      {isToggle && (
        <div className={classes.Task__Bottom}>
          <BtnFull
            clicked={() => {
              props.sendReport(true);
              console.log(props);
              props.setTaskAdminId(props.assignBy.id);
              props.setTaskId(props.id);
            }}
          >
            Send Report
          </BtnFull>
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
