import { Typography } from "@mui/material";
import classes from "./Branch.module.scss";
import { grey } from "@mui/material/colors";
import ProfileCard from "../ProfileCard/ProfileCard";
console.log;
const Branch = (props) => {
  return (
    <div className={classes.Branch}>
      <Typography
        variant="h4"
        component={"h4"}
        fontWeight={500}
        color={grey[700]}
        style={{ textTransform: "capitalize" }}
      >
        {props.branch || "Other Team Members"}
      </Typography>
      <div className={classes.Branch__Sub}>
        {props.team &&
          props.team.map((user, i) => {
            return (
              <ProfileCard
                key={i}
                id={user.id}
                bio={user.bio}
                fullName={user.fullName}
                coverPicture={user.coverPicture}
                profilePicture={user.profilePicture}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Branch;
