import classes from "./Profile_Mini.module.scss";
import { Avatar, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Router from "next/router";
const Profile_Mini = (props) => {
  return (
    <div className={classes["Profile"]}>
      <Avatar
        src={`/storage/images/profilePicture/${props.profilePicture}`}
        onClick={() => Router.push("/profile/" + props.id)}
        alt="profile picture"
      ></Avatar>
      <div>
        <Typography color={grey[600]} sx={{ textTransform: "capitalize" }}>
          {props.type} by
        </Typography>
        <Typography variant="h6" component={"h6"}>
          {props.fullName}
        </Typography>
      </div>
    </div>
  );
};

export default Profile_Mini;
