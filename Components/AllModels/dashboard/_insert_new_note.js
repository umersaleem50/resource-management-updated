import axios from "axios";
import { useRef } from "react";
import { BtnFull } from "../../Input/Buttons/Button";
import { MultiTextBox, TextInputLabel } from "../../Input/TextInput/TextInput";
import { showNofication } from "../../stateless/Notification/Notification";
import { Heading_Large } from "../../Typography/Typography";

const InsertNewNoteModel = (props) => {
  const headingRef = useRef();
  const descriptionRef = useRef();

  const submitNote = async (e) => {
    e.preventDefault();

    try {
      const note = await axios({
        url: "/api/note",
        method: "post",
        data: {
          heading: headingRef.current.value,
          description: descriptionRef.current.value,
        },
      });
      if (note)
        showNofication("Note insert successfully!", "success", () => {
          props.setNotes((prev) => {
            const copyArr = [...prev];
            copyArr.unshift(note.data.data);
            return copyArr;
          });
          props.toggleModel(false);
        });
    } catch (error) {
      console.log(error);
      showNofication(
        error.response?.data.message ||
          "Something went wrong while inserting a note.",
        "error"
      );
    }
  };
  return (
    <form onSubmit={submitNote}>
      <Heading_Large>Insert a note</Heading_Large>
      <TextInputLabel
        label="Heading for note"
        ref={headingRef}
      ></TextInputLabel>
      <MultiTextBox
        label="Description for note"
        ref={descriptionRef}
      ></MultiTextBox>
      <BtnFull>Insert a note</BtnFull>
    </form>
  );
};

export default InsertNewNoteModel;
