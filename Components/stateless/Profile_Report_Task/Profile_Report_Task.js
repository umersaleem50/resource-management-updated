import classes from "./Profile_Report_Task.module.scss";
import { generateDateFromString } from "../../../next-utils/helper_functions";
import { Paragraph } from "../../Typography/Typography";
import Image from "next/image";
import { Avatar, Typography } from "@mui/material";
import { green, grey, red } from "@mui/material/colors";
const Profile_Report_Task = (props) => {
  return (
    <div className={classes["Profile"]}>
      {/* <Image
        src={`/storage/images/profilePicture/${props.src}`}
        width={50}
        height={50}
        alt={props.src}
      /> */}
      <Avatar
        src={`/storage/images/profilePicture/${props.src}`}
        alt={props.fullName}
        sx={{ width: 50, height: 50 }}
      />
      <div className={classes["Profile__Container"]}>
        <Typography
          className={[classes["Profile__fullName"]]}
          style={{ fontWeight: "600" }}
          variant="body1"
          component={"p"}
          color={grey[700]}
        >
          {props.fullName}
        </Typography>
        <div className={classes["Profile__Container__Deadline"]}>
          {props.assignedOn && props.deadline && (
            <Paragraph>{generateDateFromString(props.assignedOn)} - </Paragraph>
          )}
          {props.deadline && (
            <Typography
              color={
                Date.now() > new Date(props.deadline).getTime()
                  ? red[700]
                  : green[700]
              }
              fontWeight={500}
            >
              {generateDateFromString(props.deadline)}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile_Report_Task;
