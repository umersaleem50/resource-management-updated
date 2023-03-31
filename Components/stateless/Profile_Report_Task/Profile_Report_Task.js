import classes from "./Profile_Report_Task.module.scss";
import { generateDateFromString } from "../../../next-utils/helper_functions";
import { Paragraph } from "../../Typography/Typography";
import Image from "next/image";
const Profile_Report_Task = (props) => {
  return (
    <div className={classes["Profile"]}>
      <Image
        src={`/storage/images/profilePicture/${props.src}`}
        width={50}
        height={50}
        alt={props.src}
      />
      <div className={classes["Profile__Container"]}>
        <Paragraph
          className={[classes["Profile__fullName"]]}
          style={{ fontWeight: "600" }}
        >
          {props.fullName}
        </Paragraph>
        <div className={classes["Profile__Container__Deadline"]}>
          {props.assignedOn && props.deadline && (
            <Paragraph>{generateDateFromString(props.assignedOn)} - </Paragraph>
          )}
          {props.deadline && (
            <Paragraph
              color={
                Date.now() > new Date(props.deadline).getTime()
                  ? "var(--color-error)"
                  : "var(--color-green)"
              }
              style={{ fontWeight: "600" }}
            >
              {generateDateFromString(props.deadline)}
            </Paragraph>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile_Report_Task;
