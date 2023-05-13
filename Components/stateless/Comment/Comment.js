import { Avatar, Typography } from "@mui/material";
import { string } from "prop-types";
import classes from "./Comment.module.scss";
import { grey } from "@mui/material/colors";
const Comment = ({ fullName, profilePicture, comment }) => {
  return (
    <div className={classes["Comment"]}>
      <Avatar src={`/storage/images/profilePicture/${profilePicture}`}></Avatar>
      <div className={classes["Comment__Left"]}>
        <Typography color={grey[600]} sx={{ marginBottom: ".5rem" }}>
          {fullName}
        </Typography>
        <Typography color={grey[900]}>{comment}</Typography>
      </div>
    </div>
  );
};

Comment.propTypes = {
  fullName: string,
  comment: string,
};

export default Comment;
