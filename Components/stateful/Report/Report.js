const { Component } = require("react");
import { Avatar, Button, Typography } from "@mui/material";
import classes from "./Report.module.scss";
import PropsType from "prop-types";
import { green, grey, red, blue } from "@mui/material/colors";
import MenuOptions from "../../Menu_Options/Menu_Options";

import { Delete, Assignment, Check, Download } from "@mui/icons-material";

class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentReportIndex: this.props?.reports?.length || 0,
      currentReport: this.props.reports[0],
    };
  }

  state = {
    currentReport: {},
  };

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

  componentDidMount() {
    console.log(this.props);
  }

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
            {this.props.taskHeading}
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
            {this.state.currentReport.heading}
          </Typography>
          <Typography
            variant="body1"
            component={"body1"}
            color={grey["A200"]}
            sx={{ mt: 5 }}
          >
            {this.state.currentReport.description}
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
                Arrived on{" "}
                {new Date(
                  this.state.currentReport.createdOn
                ).toLocaleTimeString()}
              </Typography>
              <Typography
                variant="body1"
                component={"body1"}
                fontWeight={600}
                color={grey["A100"]}
              >
                {this.props.fullName}
              </Typography>
            </div>
          </div>
          {this.state?.currentReport?.attachments &&
            this.props.attachments.length && (
              <div className={classes["Report__Attachments"]}>
                <Typography
                  variant="body1"
                  component={"body1"}
                  fontWeight={600}
                  color={grey["A100"]}
                  sx={{ mb: 1 }}
                >
                  {this.state.currentReport.attachments.length}+ Attachments
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Download />}
                  style={{ backgroundColor: grey[900] }}
                >
                  Download
                </Button>
              </div>
            )}
        </div>
      </div>
    );
  }
}

Report.propsType = {
  reports: PropsType.array,
  profilePicture: PropsType.string,
  fullName: PropsType.string,
};

export default Report;
