import { Component } from "react";
import Report from "../Report/Report";
import classes from "./Reports.module.scss";
import { Typography } from "@mui/material";
import { blue, grey, purple } from "@mui/material/colors";
import { all_reports_callback } from "../../../services/pages/index_requests";
import { showSnackBar } from "../../../next-utils/helper_functions";
class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: [],
      toggleModel: true,
      toggleAssignTaskModel: false,
      currentTaskId: "",
    };
  }

  async fetchLatestReports() {
    try {
      const reports = await all_reports_callback();
      const fetchedReportsArr = reports.data;

      if (reports) {
        this.setState({
          reports: fetchedReportsArr.reverse(),
        });
      }
    } catch (error) {
      showSnackBar(this.props.snackBar, error.message, "error");
    }
  }

  async componentDidMount() {
    this.fetchLatestReports();
  }

  generateReports(reports) {
    return reports.map((el, i) => {
      return <Report />;
    });
  }

  render() {
    return (
      <div className={classes["Reports"]}>
        <Typography
          variant="h6"
          component={"h6"}
          color={grey[700]}
          style={{ textTransform: "uppercase" }}
        >
          Team's Report
        </Typography>
        <div className={classes["Reports__Container"]}>
          {/* {this.generateReports(this.state.reports)} */}
          <Report color={purple[500]} />
          <Report />
          <Report color={blue[500]} />
        </div>
      </div>
    );
  }
}

export default Reports;
