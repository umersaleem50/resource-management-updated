import axios from "axios";
import { useEffect, useState } from "react";
import Model_Insert_New_Note from "../../AllModels/dashboard/Model_Insert_New_Note";
import Model from "../Model/Model";
import Note from "../Note/Note";
import { useSnackbar } from "notistack";
import classes from "./Notes.module.scss";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Button, Typography } from "@mui/material";
import AddTask from "@mui/icons-material/AddTask";
import { showSnackBar } from "../../../next-utils/helper_functions";
import { blue, grey } from "@mui/material/colors";

const Notes = (props) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [allnotes, setNotes] = useState([]);
  const [toggleModel, setToggleModel] = useState(false);
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

  const fetchLatestNotes = async () => {
    try {
      const notes = await axios({
        url: "/api/v1/notes",
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
      }
    } catch (error) {
      showSnackBar(enqueueSnackbar, error.message, "error");
    }
  };

  useEffect(() => {
    // (async () => {
    //   try {
    //     const notes = await axios({
    //       url: "/api/v1/note",
    //       method: "get",
    //       params: {
    //         sort: "-createdOn",
    //       },
    //     });
    //     if (notes) {
    //       setNotes((prev) => {
    //         if (prev.length !== notes.data.data.length) return notes.data.data;
    //         return prev;
    //       });
    //     }
    //   } catch (error) {
    //     showSnackBar(enqueueSnackbar, error.message, "error");
    //   }
    // })();
    fetchLatestNotes();
  }, [allnotes]);

  const generateAllNotes = (notes) => {
    if (notes.length <= 0) {
      return (
        <div className={classes.EmptyNote}>
          <Typography variant="body1" color={grey[600]}>
            You currently have no note.
          </Typography>
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
      <Model toggle={toggleModel} onClose={() => setToggleModel(false)}>
        <Model_Insert_New_Note
          fetchData={() => fetchLatestNotes()}
          closeModel={() => setToggleModel(false)}
        />
      </Model>
      <div className={classes.Notes__Top}>
        <Typography
          variant="h6"
          component={"h6"}
          color={grey[700]}
          style={{ textTransform: "uppercase" }}
        >
          My Notes
        </Typography>
        <div className={classes.Notes__Top__Right}>
          <Button
            startIcon={<AddTask />}
            onClick={() => setToggleModel(true)}
            color="primary"
            variant="contained"
          >
            New
          </Button>
        </div>
      </div>

      <div className={classes.Notes__Notes}>{generateAllNotes(allnotes)}</div>
    </div>
  );
};

export default Notes;
