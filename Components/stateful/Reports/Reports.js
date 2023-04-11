import { Component } from "react";
import { Heading_Large, Heading_Tiny } from "../../Typography/Typography";
// import Report from "../Report/Report";
import Report from "../Report/Report";
import axios from "axios";
import Model from "../../stateless/Model/Model";
import classes from "./Reports.module.scss";
// import { showNofication } from "../../stateless/Notification/Notification";
import Reassign_Task_Model from "../../AllModels/dashboard/_reassign_task_model";
import { Typography } from "@mui/material";
import { blue, grey, purple } from "@mui/material/colors";
import { all_reports_callback } from "../../../services/request_function";
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
      return (
        <Report />
        // <Report
        //   task={el?.task?.tasks}
        //   reportBy={el.reportBy}
        //   reports={el.reports}
        //   key={i}
        //   taskId={el?.task?._id}
        //   toggleModel={(id) =>
        //     this.setState({ toggleAssignTaskModel: true, currentTaskId: id })
        //   }
        // ></Report>
      );
    });
  }

  render() {
    return (
      <div className={classes["Reports"]}>
        {this.state.toggleAssignTaskModel && (
          <Model
            toggleModel={() => this.setState({ toggleAssignTaskModel: false })}
          >
            <Reassign_Task_Model
              closeModel={() => this.setState({ toggleAssignTaskModel: false })}
              taskId={this.state.currentTaskId}
            />
          </Model>
        )}
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
