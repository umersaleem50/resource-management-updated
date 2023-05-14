import { Avatar, IconButton, Typography } from "@mui/material";
import { string } from "prop-types";
import classes from "./Comment.module.scss";
import { blue, grey, red } from "@mui/material/colors";
import { Delete } from "@mui/icons-material";
import { delete_comment_request } from "../../../services/pages/feeds";
import { showSnackBar } from "../../../next-utils/helper_functions";
import { enqueueSnackbar } from "notistack";
import Router from "next/router";
const Comment = ({
  fullName,
  profilePicture,
  comment,
  id,
  onCommentDelete,
  isDeletable,
  member_id,
}) => {
  const delete_comment = async (comment_id) => {
    try {
      const results = await delete_comment_request(comment_id);
      onCommentDelete(comment_id);
      showSnackBar(enqueueSnackbar, "Comment delete successfully!", "success");
    } catch (error) {
      if (error) return showSnackBar(enqueueSnackbar, error.message, "error");
      return showSnackBar(
        enqueueSnackbar,
        "Failed in deleting comment, try again later!"
      );
    }
  };
  return (
    <div className={classes["Comment"]}>
      <Avatar
        src={`/storage/images/profilePicture/${profilePicture}`}
        onClick={() => Router.push(`/profile/${member_id}`)}
      ></Avatar>
      <div className={classes["Comment__Left"]}>
        <Typography
          color={blue[600]}
          sx={{ marginBottom: ".5rem", fontWeight: "500" }}
        >
          {fullName}
        </Typography>
        <Typography color={grey[900]}>{comment}</Typography>
      </div>
      {isDeletable && (
        <IconButton
          className={classes["Comment__IconDelete"]}
          onClick={(e) => {
            delete_comment(id);
          }}
        >
          <Delete sx={{ color: red[700] }} />
        </IconButton>
      )}
    </div>
  );
};

Comment.propTypes = {
  fullName: string,
  comment: string,
};

export default Comment;
