import { BtnFull } from "../../Input/Buttons/Button";
import { Heading_Tiny, Paragraph } from "../../Typography/Typography";
import classes from "./Note.module.scss";
import { useState } from "react";
import axios from "axios";
import { showNofication } from "../Notification/Notification";
const Note = (props) => {
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
        url: `/api/note/${props.id}`,
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
      showNofication(
        error.response?.data.message ||
          "Something went wrong while removing the note.",
        "error"
      );
    }
  };

  return (
    <div
      className={classes.Note}
      onClick={() => setNoteToggle((prev) => !prev)}
    >
      <div className={classes.Note__Top}>
        <Heading_Tiny bold={"600"}>{props.heading}</Heading_Tiny>
        <Paragraph>{props.date}</Paragraph>
      </div>
      <div className={classes.Details}>
        <Paragraph>{props.description}</Paragraph>
      </div>
      {isNoteToggle && (
        <div className={classes.Note__Actions}>
          {/* <BtnFull style={{ ...btn_style }}>Edit</BtnFull> */}
          <BtnFull
            style={{ ...btn_style, backgroundColor: "var(--color-error)" }}
            clicked={removeNote}
          >
            Remove
          </BtnFull>
        </div>
      )}
    </div>
  );
};

export default Note;
