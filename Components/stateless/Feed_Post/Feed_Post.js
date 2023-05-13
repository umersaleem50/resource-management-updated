import { Component } from "react";
import Carousel from "nuka-carousel";
import { showSnackBar } from "../../../next-utils/helper_functions";
import classes from "./Feed_Post.module.scss";
import Image from "next/image";
import axios from "axios";
import { fetch_one_post_data } from "../../../services/pages/feeds";
import { enqueueSnackbar } from "notistack";
import { grey } from "@mui/material/colors";
import { Avatar, Divider, TextField, Typography } from "@mui/material";
import Comment from "../Comment/Comment";
import Scrollbars from "react-custom-scrollbars-2";
import Router from "next/router";

class Feed_Post extends Component {
  state = { data: {} };
  componentDidMount() {
    fetch_one_post_data(this.props.id)
      .then((result) => {
        console.log(result);
        this.setState({ data: result.data });
      })
      .catch((err) => {
        if (err.status === "error")
          return showSnackBar(enqueueSnackbar, err.message, "error");
        showSnackBar(enqueueSnackbar, "Failed to fetch post data");
      });
  }

  async post_new_comment() {
    try {
      const results = await post_comment_request();
    } catch (error) {}
  }

  generateImages(images) {
    if (!images || !images.length) return;
    return images.map((img) => {
      return (
        <div className={classes["Post__Div"]}>
          <Image src={`/storage/images/new-post/images/${img}`} fill></Image>
        </div>
      );
    });
  }

  generateComments(comments) {
    return (
      <Scrollbars autoHeight autoHeightMax={250}>
        {comments
          .map(({ comment, member }, i) => {
            return (
              <Comment
                fullName={member.fullName}
                profilePicture={member.profilePicture}
                comment={comment}
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
              src={this.props?.member?.profilePicture}
              onClick={(e) => Router.push(`/profile/${this.props?.member?.id}`)}
            />
            <div className={classes["Post__Profile__Details"]}>
              <Typography
                variant="body1"
                component={"p"}
                color={grey[800]}
                sx={{ fontWeight: "600", marginBottom: ".5rem" }}
              >
                Muhammad Bilal
              </Typography>
              <Typography variant="body1" component={"p"} color={grey[600]}>
                7:33 Am, 12 oct
              </Typography>
            </div>
          </div>
          <div className={classes["Post__Caption"]}>
            <Typography>this is the test paragraph</Typography>
          </div>
          <div className={classes["Post__Comments"]}>
            <Divider sx={{ marginBottom: "1rem" }}></Divider>
            <Typography
              variant="body1"
              component={"p"}
              color={grey[800]}
              sx={{ fontWeight: "600", marginBottom: ".5rem" }}
            >
              Comments (20)
            </Typography>
            {this.state.data.comments &&
              this.generateComments(this.state.data.comments)}
          </div>
          <Divider sx={{ margin: "1rem 0" }}></Divider>
          <TextField
            rows={3}
            multiline
            fullWidth
            placeholder="Place a comment"
          ></TextField>
        </div>
      </div>
    );
  }
}

export default Feed_Post;
