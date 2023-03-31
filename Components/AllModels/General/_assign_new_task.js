import { useEffect, useRef, useState } from "react";
import ProfileAssigning from "../../Input/ProfileAssiging/ProfileAssigning";
import SelectInput from "../../Input/SelectInput/SelectInput";
import { Paragraph } from "../../Typography/Typography";
import axios from "axios";
import classes from "./_assign_new_task.module.scss";
import { DateInput } from "../../Input/DateInput/DateInput";
import MiniProfile from "../../MiniProfile/MiniProfile";
const Assign_New_Task = (props) => {
  const [team, setTeam] = useState([]);
  const [description, setDescription] = useState("");
  const [selectedTeam, setSelectedTeam] = useState([]);
  const deadlineRef = useRef();
  const descriptionRef = useRef();
  const taskPriorityOptions = [
    {
      value: "unimportant",
      text: "Un-important",
      color: "var(--color-green)",
    },
    {
      value: "important",
      text: "Important",
      color: "var(--color-orange)",
    },

    {
      value: "critical",
      text: "Critical",
      color: "var(--color-error)",
    },
  ];

  const config = {
    buttons: ["bold"],
  };

  useEffect(() => {
    (async () => {
      try {
        const URL = `/api/profile/team?fields=profilePicture,firstName,lastName`;
        const teamData = await axios({ url: URL, method: "GET" });
        console.log(teamData);
        if (teamData) setTeam(teamData.data.data.team);
      } catch (error) {}
    })();
  }, []);

  const Container = ({ heading, ...props }) => {
    return (
      <div className={classes["Form__Container"]}>
        <Paragraph weight={"600"} color="var(--color-font)">
          {heading}
        </Paragraph>
        <div className={classes["Form__Container__Content"]}>
          {props.children}
        </div>
      </div>
    );
  };
  return (
    <form className={classes["Form"]}>
      <Container heading="Task Details">
        <div className={classes["Form__Item"]}>
          <Paragraph>Pirority</Paragraph>
          <SelectInput options={taskPriorityOptions} />
        </div>
        <div className={classes["Form__Item"]}>
          <Paragraph>Assignees</Paragraph>
          <ProfileAssigning
            profiles={team}
            selectedTeam={selectedTeam}
            setSelectedTeam={setSelectedTeam}
          />
        </div>
        <div className={classes["Form__Item"]}>
          <label htmlFor="deadline-input">
            <Paragraph>Deadline</Paragraph>
          </label>
          <DateInput id="deadline-input" ref={deadlineRef} />
        </div>
      </Container>
      <Container heading="Description"></Container>
      <Container heading="Attachments"></Container>
    </form>
  );
};

export default Assign_New_Task;
