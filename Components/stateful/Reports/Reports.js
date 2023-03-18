import { Component } from "react";
import { Heading_Large, Heading_Tiny } from "../../Typography/Typography";
import Report from "../Report/Report";
import axios from "axios";
import Model from "../../stateless/Model/Model";
import classes from "./Reports.module.scss";
import { showNofication } from "../../stateless/Notification/Notification";
import Reassign_Task_Model from "../../AllModels/dashboard/_reassign_task_model";

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

  async componentDidMount() {
    try {
      const reports = await axios({ url: "/api/reports", method: "GET" });
      if (reports) this.setState({ reports: reports.data.data });
      console.log(reports);
    } catch (error) {
      showNofication(error?.response?.data?.message, "error");
    }
  }

  generateReports(reports) {
    return reports.map((el, i) => {
      return (
        <Report
          task={el.task.tasks}
          reportBy={el.reportBy}
          reports={el.reports}
          key={i}
          taskId={el.task._id}
          toggleModel={(id) =>
            this.setState({ toggleAssignTaskModel: true, currentTaskId: id })
          }
        ></Report>
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
        <Heading_Tiny style={{ fontWeight: "600" }}>Team Reports</Heading_Tiny>
        <div className={classes["Reports__Container"]}>
          {this.generateReports(this.state.reports)}
        </div>
      </div>
    );
  }
}

export default Reports;
