import { Typography, TextField, Divider } from "@mui/material";
import { useState } from "react";
const Model_Edit_Service = (props) => {
  const [name, setName] = useState("");
  const [heading, setHeading] = useState("");
  const [detail1, setDetail1] = useState("");
  const [detailHeading1, setDetailHeading1] = useState("");
  const [detailHeading2, setDetailHeading2] = useState("");
  return (
    <form className={classes["Form"]} onSubmit={onSubmit}>
      <Typography
        className={classes["Form__Heading"]}
        variant="h5"
        component={"h5"}
      >
        Create Sub Account
      </Typography>
      <Typography
        className={classes["Form__Heading"]}
        variant="body1"
        component={"p"}
      >
        Here you can create a sub account for your team member
      </Typography>

      <Divider></Divider>
      <TextField
        type="text"
        required
        variant="standard"
        placeholder="Enter the name of your service"
        label={"Name"}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </form>
  );
};

export default Model_Edit_Service;
