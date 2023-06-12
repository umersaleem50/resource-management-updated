import { Component } from "react";
import Carousel from "nuka-carousel";
import {
  generateDateFromString,
  showSnackBar,
} from "../../../next-utils/helper_functions";
import classes from "./Feed_Post.module.scss";
import Image from "next/image";
import axios from "axios";
import { fetch_one_post_data } from "../../../services/pages/feeds";
import { enqueueSnackbar } from "notistack";
import { grey } from "@mui/material/colors";
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Comment from "../Comment/Comment";
import Scrollbars from "react-custom-scrollbars-2";
import Router from "next/router";
import { post_new_comment } from "../../../services/pages/feeds";

class Feed_Post extends Component {
  constructor(props) {
    super(props);

    this.state = { data: props.data, comments: props.comments, comment: "" };
  }

  async post_comment() {
    const formData = new FormData();
    formData.append("comment", formData);
    try {
      const result = await post_new_comment(
        this.props.token,
        this.state.data._id,
        {
          comment: this.state.comment,
        }
      );
      if (result)
        showSnackBar(
          enqueueSnackbar,
          "Successfully Created a comment",
          "success"
        );
      const my_comment = result.data;
      my_comment.member = this.state.data.member;
      const comments = [...this.state.comments];
      comments.push(my_comment);
      this.setState({ comments: comments, comment: "" });
    } catch (error) {
      if (error.status === "error")
        return showSnackBar(enqueueSnackbar, error.message, "error");
      return showSnackBar(
        enqueueSnackbar,
        "Failed to post a comment.",
        "error"
      );
    }
  }

  onCommentDelete(id) {
    const comments = [...this.state.comments];

    comments.splice(
      comments.findIndex((val) => val._id === id),
      1
    );
    this.setState({ comments });
  }

  componentDidMount() {}

  async post_new_comment() {
    try {
      const results = await post_comment_request();
    } catch (error) {}
  }

  generateImages(images) {
    if (!images || !images.length) return;
    return images.map((img, i) => {
      return (
        <div className={classes["Post__Div"]}>
          <Image
            src={`/storage/images/new-post/images/${img}`}
            fill
            alt={`post-image-${i + 1}`}
          ></Image>
        </div>
      );
    });
  }

  generateComments() {
    return (
      <Scrollbars autoHeight autoHeightMax={230}>
        {this.state.comments
          .map(({ comment, member, _id }, i) => {
            return (
              <Comment
                fullName={member.fullName}
                profilePicture={member.profilePicture}
                comment={comment}
                isDeletable={member._id === this.props.id}
                id={_id}
                onCommentDelete={this.onCommentDelete.bind(this)}
                member_id={member._id}
              />
            );
          })
          .reverse()}
      </Scrollbars>
    );
  }

  render() {
    return (
      <div className={classes["Post"]} style={{ backgroundColor: grey[200] }}>
        <div className={classes["Post__Left"]}>
          <Carousel className={classes["Post__Slider"]}>
            {this.generateImages(this.state.data.images)}
          </Carousel>
        </div>
        <div className={classes["Post__Right"]}>
          <div className={classes["Post__Profile"]}>
            <Avatar
              src={`/storage/images/profilePicture/${this.state.data?.member?.profilePicture}`}
              onClick={(e) => Router.push(`/profile/${this.props?.member?.id}`)}
            />
            <div className={classes["Post__Profile__Details"]}>
              <Typography
                variant="body1"
                component={"p"}
                color={grey[800]}
                sx={{ fontWeight: "600", marginBottom: ".5rem" }}
              >
                {this.state.data?.member?.fullName}
              </Typography>
              <Typography variant="body1" component={"p"} color={grey[600]}>
                {this.state.data?.createdOn &&
                  generateDateFromString(this.state.data.createdOn)}
              </Typography>
            </div>
          </div>
          <div className={classes["Post__Caption"]}>
            <Typography>{this.state.data?.caption}</Typography>
          </div>
          <div className={classes["Post__Comments"]}>
            <Divider sx={{ marginBottom: "1rem" }}></Divider>
            <Typography
              variant="body1"
              component={"p"}
              color={grey[800]}
              sx={{ fontWeight: "600", marginBottom: ".5rem" }}
            >
              Comments ({this.state.comments.length})
            </Typography>
            {this.state.data.comments &&
              this.generateComments(this.state.comments)}
          </div>
          <Divider sx={{ margin: "1rem 0" }}></Divider>
          <TextField
            rows={3}
            multiline
            fullWidth
            placeholder="Place a comment"
            value={this.state.comment}
            onChange={(e) => this.setState({ comment: e.target.value })}
            onKeyDown={async (e) => {
              if (e.key === "Enter") await this.post_comment();
            }}
          ></TextField>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 1 }}
            disabled={this.state.comment === ""}
            onClick={async () => await this.post_comment()}
          >
            Send Comment
          </Button>
        </div>
      </div>
    );
  }
}

export default Feed_Post;
