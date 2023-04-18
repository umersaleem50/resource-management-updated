import { Typography, TextField, Button } from "@mui/material";
import classes from "./Model_Insert_New_Note.module.scss";
import { useState } from "react";
import { post_create_note_callback } from "../../../services/pages/index_requests";
import { showSnackBar } from "../../../next-utils/helper_functions";
import { enqueueSnackbar } from "notistack";
const Model_Insert_New_Note = (props) => {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await post_create_note_callback({ heading, description });
      console.log(result);
      if (result.status === "success") {
        showSnackBar(
          enqueueSnackbar,
          "Successfully! Created a note.",
          "success"
        );
        props.fetchData();
        props.closeModel();
      }
    } catch (error) {
      if (error.status === "error")
        showSnackBar(enqueueSnackbar, error.message, "error");
    }
  };
  return (
    <form className={classes["Form"]} onSubmit={onSubmit}>
      <Typography
        className={classes["Form__Heading"]}
        variant="h5"
        component={"h5"}
      >
        Create a note
      </Typography>
      <Typography
        className={classes["Form__Heading"]}
        variant="body1"
        component={"p"}
      >
        Create a note for your self, these notes could act as reminder
      </Typography>
      <TextField
        type="text"
        required
        variant="standard"
        placeholder="Type a heading for note"
        label={"Heading"}
        value={heading}
        onChange={(e) => setHeading(e.target.value)}
      />
      <TextField
        type="text"
        required
        variant="standard"
        placeholder="Type a description for note"
        label={"Description"}
        value={description}
        multiline
        rows={4}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button variant="contained" type="submit">
        Create Note
      </Button>
    </form>
  );
};

export default Model_Insert_New_Note;
