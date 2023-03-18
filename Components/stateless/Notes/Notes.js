import axios from "axios";
import { useEffect, useState } from "react";
import InsertNewNoteModel from "../../AllModels/dashboard/_insert_new_note";
import { BtnFull, BtnOptions } from "../../Input/Buttons/Button";
import { Heading_Tiny, Paragraph } from "../../Typography/Typography";
import Model from "../Model/Model";
import Note from "../Note/Note";
import { showNofication } from "../Notification/Notification";
import classes from "./Notes.module.scss";
import { Scrollbars } from "react-custom-scrollbars-2";
const Notes = (props) => {
  const [allnotes, setNotes] = useState([]);
  const [isWannaInsertNote, setWannaInsertNote] = useState(false);
  const note_options = [
    {
      title: "Insert a note",
      callback: () => {},
    },
    {
      title: "Search a note",
      // type:'critical'
      callback: () => {},
    },
    {
      title: "Remove all",
      // type:'critical'
      callback: () => {},
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const notes = await axios({
          url: "/api/note",
          method: "get",
          params: {
            sort: "-createdOn",
          },
        });
        if (notes) {
          setNotes((prev) => {
            if (prev.length !== notes.data.data.length) return notes.data.data;
            return prev;
          });
          console.log(notes);
        }
      } catch (error) {
        // console.log(error);
        showNofication(
          "Something went wrong, while loading the notes.",
          "error"
        );
      }
    })();
  }, []);

  const generateAllNotes = (notes) => {
    if (notes.length <= 0) {
      return (
        <div className={classes.EmptyNote}>
          <Paragraph>You currently have no note.</Paragraph>
        </div>
      );
    }
    const DateFormater = new Intl.DateTimeFormat("en-GB");

    return (
      <Scrollbars autoHeight autoHeightMin={0} autoHeightMax={450}>
        {notes.map((el, i) => {
          return (
            <Note
              key={i}
              id={el._id}
              heading={el.heading}
              description={el.description}
              date={DateFormater.format(new Date(el.createdOn))}
              setNotes={setNotes}
              index={i}
            />
          );
        })}
      </Scrollbars>
    );
  };
  return (
    <div className={classes.Notes}>
      {isWannaInsertNote && (
        <Model toggleModel={setWannaInsertNote}>
          <InsertNewNoteModel
            setNotes={setNotes}
            toggleModel={setWannaInsertNote}
          ></InsertNewNoteModel>
        </Model>
      )}
      <div className={classes.Notes__Top}>
        <Heading_Tiny style={{ fontWeight: "600" }}>My Notes</Heading_Tiny>
        <div className={classes.Notes__Top__Right}>
          <BtnFull
            style={{
              height: "3rem",
              display: "flex",
              alignItems: "center",
              marginRight: "2rem",
            }}
            clicked={() => setWannaInsertNote(true)}
          >
            New +
          </BtnFull>
        </div>
      </div>

      <div
        className={classes.Notes__Notes}
        // style={{ padding: "2rem", height: "70%" }}
      >
        {/* <Scrollbars autoHeight autoHeightMin={0} autoHeightMax={450}> */}
        {generateAllNotes(allnotes)}
        {/* </Scrollbars> */}
      </div>
    </div>
  );
};

export default Notes;
