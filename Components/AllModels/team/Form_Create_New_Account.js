import { Button, TextField, Typography } from "@mui/material";
import CustomSelectInput from "../../Input/SelectInput/CustomSelectInput";
import { useState } from "react";
import classes from "./Form_Create_New_Account.module.scss";
import { post_create_sub_account } from "../../../services/pages/team";
import { showSnackBar } from "../../../next-utils/helper_functions";
import { enqueueSnackbar } from "notistack";
import MultiSelectChip from "../../Input/MultiSelectChip/MultiSelectChip";
import { branches } from "../../../Dev-Data/branches";

const Form_Create_New_Account = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [category, setCategory] = useState("");
  const [branch, setBranchOptions] = useState(branches);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const results = await post_create_sub_account({
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
        permissions,
        category,
      });

      if (results.status === "success") props.closeModel();
      showSnackBar(
        enqueueSnackbar,
        "Successfully created a sub account",
        "success"
      );
    } catch (err) {
      if (err.status === "error")
        showSnackBar(enqueueSnackbar, err.message, "error");
    }
  };
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

      <TextField
        type="email"
        required
        variant="standard"
        placeholder="Enter a valid email"
        label={"Email"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        type="text"
        label={"First Name"}
        required
        variant="standard"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="Enter your first name"
      />
      <TextField
        type="text"
        label={"Last Name"}
        required
        variant="standard"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Enter your first name"
      />
      <MultiSelectChip
        label={"Set Permissons"}
        value={permissions}
        setValue={setPermissions}
        options={props.otherData.permissions}
      />
      <CustomSelectInput
        initalValue={category}
        setInputValue={setCategory}
        options={branch}
        setOptions={setBranchOptions}
      />
      <TextField
        type="password"
        label={"Password"}
        required
        value={password}
        variant="standard"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Choose a strong password"
      />
      <TextField
        type="password"
        label={"Confirm Password"}
        required
        variant="standard"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        placeholder="Confirm your password"
        helperText={`Passwords ${"not"} matched!`}
      />
      {/* <CustomSelectInput></CustomSelectInput> */}
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default Form_Create_New_Account;
