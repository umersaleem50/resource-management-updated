const { Component } = require("react");
import { Avatar, Button, Typography } from "@mui/material";
import classes from "./Report.module.scss";
import { green, grey, red, blue } from "@mui/material/colors";
import MenuOptions from "../../stateful/Menu_Options/Menu_Options";

import { Delete, Assignment, Check, Download } from "@mui/icons-material";

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = { currentReportIndex: 1 };
  }

  settings_options = [
    {
      text: "Re-Assign Task",
      color: blue[700],
      onClick: () => {},
      icon: <Assignment fontSize="small" color={blue[700]} />,
    },
    {
      text: "Assign Task Complete",
      color: green[700],
      onClick: () => {
        alert("working");
      },
      icon: <Check fontSize="small" color={green[700]} />,
    },
    {
      text: "Delete Report",
      color: red[700],
      onClick: () => {},
      icon: <Delete fontSize="small" color={red[700]} />,
    },
  ];

  render() {
    return (
      <div
        className={classes["Report"]}
        style={{ backgroundColor: this.props.color || green[700] }}
      >
        <div className={classes["Report__Top"]}>
          <Typography
            color={grey[900]}
            variant={"body1"}
            component={"p"}
            style={{ textDecoration: "underline" }}
            fontWeight={"500"}
          >
            Paint the other side of the doors. And also make it pop.
          </Typography>
          {/* <Select
            labelId="report-index-select"
            id="report-index-select"
            size="small"
            value={this.state.currentReportIndex}
            label="Age"
            onChange={this.handleChange}
          >
            <MenuItem value={10} color={green[900]}>
              Ten
            </MenuItem>
          </Select> */}
          <MenuOptions
            text={"Options"}
            white
            settings={this.settings_options}
          />
        </div>
        <div className={classes["Report__Content"]}>
          <Typography
            variant="h6"
            component={"h5"}
            color={grey[100]}
            sx={{ mb: 2 }}
            fontWeight={600}
          >
            We have completed the house project on the north side.
          </Typography>
          <Typography
            variant="body1"
            component={"body1"}
            color={grey["A200"]}
            sx={{ mt: 5 }}
          >
            We have successfully complete the building located on the north side
            with the help of our team. Now we’re waiting for your response.
            Please let us now
          </Typography>
        </div>
        <div className={classes["Report__Bottom"]}>
          <div className={classes["Profile"]}>
            <Avatar
              src={`/assets/profilePicture/${this.props.profilePicture}`}
            ></Avatar>
            <div className={classes["Profile__details"]}>
              <Typography
                variant="body2"
                component={"body2"}
                fontWeight={500}
                color={grey[900]}
              >
                Arrived on {new Date().toLocaleTimeString()}
              </Typography>
              <Typography
                variant="body1"
                component={"body1"}
                fontWeight={600}
                color={grey["A100"]}
              >
                {"Muhammad Umar Saleem"}
              </Typography>
            </div>
          </div>
          <div className={classes["Report__Attachments"]}>
            <Typography
              variant="body1"
              component={"body1"}
              fontWeight={600}
              color={grey["A100"]}
              sx={{ mb: 1 }}
            >
              2+ Attachments
            </Typography>
            <Button
              variant="contained"
              startIcon={<Download />}
              style={{ backgroundColor: grey[900] }}
            >
              Download
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Report;
