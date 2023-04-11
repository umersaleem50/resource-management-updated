import { BtnFull } from "../../Input/Buttons/Button";
import { Heading_Tiny, Paragraph } from "../../Typography/Typography";
import classes from "./Note.module.scss";
import { useState } from "react";
import axios from "axios";
// import { showNofication } from "../Notification/Notification";
import { Button, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { grey } from "@mui/material/colors";
import { showSnackBar } from "../../../next-utils/helper_functions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNote from "@mui/icons-material/EditNote";

const Note = (props) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isNoteToggle, setNoteToggle] = useState(false);
  const btn_style = {
    height: "3.5rem",
    display: "flex",
    alignItems: "center",
  };

  const removeNote = async (e) => {
    e.stopPropagation();

    try {
      const note = await axios({
        url: `/api/v1/note/${props.id}`,
        method: "Delete",
      });
      if (note) {
        props.setNotes((prev) => {
          const copyArr = [...prev];
          copyArr.splice(props.index, 1);
          return copyArr;
        });
      }
    } catch (error) {
      showSnackBar(enqueueSnackbar, error.message, "error");
    }
  };

  return (
    <div
      className={classes.Note}
      onClick={() => setNoteToggle((prev) => !prev)}
    >
      <div className={classes.Note__Top}>
        {/* <Heading_Tiny bold={"600"}>{props.heading}</Heading_Tiny> */}
        <Typography
          variant="body1"
          fontWeight={"bold"}
          component={"body1"}
          color={grey[800]}
          // style={{ color: "var(--color-font-black)" }}
        >
          {props.heading}
        </Typography>
        <Typography variant="body1" component={"body1"} color={grey[500]}>
          {props.date}
        </Typography>
      </div>
      <div className={classes.Details}>
        <Typography color={grey[600]}>{props.description}</Typography>
      </div>
      {isNoteToggle && (
        <div className={classes.Note__Actions}>
          {/* <BtnFull style={{ ...btn_style }}>Edit</BtnFull> */}
          <Button variant="outlined" color="primary" startIcon={<EditNote />}>
            Edit
          </Button>

          <Button
            variant="contained"
            onClick={removeNote}
            color="error"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          {/* <BtnFull
            style={{ ...btn_style, backgroundColor: "var(--color-error)" }}
            clicked={removeNote}
          >
            Remove
          </BtnFull> */}
        </div>
      )}
    </div>
  );
};

export default Note;
