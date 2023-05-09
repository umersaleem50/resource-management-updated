import { useState } from "react";
import { Typography, Divider, TextField, Button } from "@mui/material";
import classes from "./Model_Add_Post.module.scss";
import { showSnackBar } from "../../../../next-utils/helper_functions";
import { enqueueSnackbar } from "notistack";
import { useRef } from "react";
import { send_new_post_request } from "../../../../services/pages/feeds";
const Model_Add_Post = (props) => {
  const [images, setImages] = useState([]);
  const imageRef = useRef(null);
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!images.length)
      return showSnackBar(
        enqueueSnackbar,
        "Please selete atleast 1 image for the post",
        "error"
      );

    const tagsArr = tags
      .split("#")
      .filter((el) => el !== "")
      .map((el) => el.replace(/#/g, ""));
    console.log(tagsArr);
    try {
      const results = await send_new_post_request({
        caption,
        tags: tagsArr,
        images,
      });
      console.log(results, tagsArr);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={onSubmit} className={classes["Form"]}>
      <div className={classes["Heading"]}>
        <Typography
          className={classes["Form__Heading"]}
          variant="h5"
          component={"h5"}
        >
          Add a new post to the feeds
        </Typography>
        <Typography
          className={classes["Form__Heading"]}
          variant="body1"
          component={"p"}
        >
          You can post something new to your feeds
        </Typography>

        <Divider sx={{ m: "1rem 0" }} />
      </div>
      <Typography
        className={classes["Form__Heading"]}
        variant="body1"
        component={"p"}
        sx={{ fontWeight: "bold" }}
      >
        Number of Images selected: {images.length}
      </Typography>
      <Button variant="outlined" component="label">
        Update Image
        <input
          hidden
          accept="image/*"
          type="file"
          multiple
          // required
          ref={imageRef}
          onChange={(e) => {
            setImages(e.target.files);
          }}
        />
      </Button>
      <TextField
        type="text"
        rows={4}
        multiline
        required
        variant="standard"
        placeholder="Enter the caption for post"
        label={"Caption"}
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <TextField
        type="text"
        required
        variant="standard"
        placeholder="#car #machine #tags"
        label={"tags"}
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <Button variant="contained" type="submit">
        Send Post
      </Button>
    </form>
  );
};

export default Model_Add_Post;
