import Profile_Report_Task from "../../stateless/Profile_Report_Task/Profile_Report_Task";
import {
  Heading_Large,
  Heading_Secondary,
  Heading_Tiny,
  Paragraph,
} from "../../Typography/Typography";
import { useState } from "react";
import classes from "./Report.module.scss";
import { BtnFull } from "../../Input/Buttons/Button";
const Report = (props) => {
  const [isToggleLarge, setToggleLarge] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  return (
    <div
      className={classes["Report"]}
      onClick={() => setToggleLarge((prev) => !prev)}
    >
      {/* {!isToggleLarge && ( */}
      <div className={classes["Report__Small"]}>
        <Heading_Tiny className={classes["Report__Task"]}>
          {props.task && props.task[currentLevel].heading}
        </Heading_Tiny>
        <Profile_Report_Task
          profilePicture={props?.reportBy?.profilePicture}
          fullName={props?.reportBy?.fullName}
        />
        <Heading_Large>{props.reportHeading}</Heading_Large>
        <Paragraph className={[classes["Report__Description"]]}>
          {props.taskDescription}
        </Paragraph>
      </div>
      <div className={classes["Report__Large"]}>
        <Paragraph>{props.reports[currentLevel].description}</Paragraph>
      </div>
      {isToggleLarge && (
        <div className={classes["Report__Bottom"]}>
          <BtnFull
            clicked={(e) => {
              e.stopPropagation();
              props.toggleModel(props.taskId);
            }}
          >
            Re-Assign Task
          </BtnFull>
        </div>
      )}

      {/* )} */}
    </div>
  );
};

export default Report;
