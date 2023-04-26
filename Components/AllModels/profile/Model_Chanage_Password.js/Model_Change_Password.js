import { enqueueSnackbar } from "notistack";
import { showSnackBar } from "../../../../next-utils/helper_functions";
import { update_password_request } from "../../../../services/pages/profile";
import classes from "./Model_Change_Password.module.scss";
import { Typography, TextField, Divider, Button } from "@mui/material";
import { useState } from "react";
const Model_Change_Password = ({ data }) => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const requestData = { password, passwordConfirm };
    if (data?.page_data.type === "own-page") {
      requestData.oldPassword = oldPassword;
    }
    try {
      const result = await update_password_request(
        requestData,
        data.page_data.type === "own-page" ? null : id
      );
      if (result.status === "success")
        showSnackBar(
          enqueueSnackbar,
          "Password updated successfully!",
          "success"
        );
    } catch (error) {
      showSnackBar(enqueueSnackbar, error.message, "error");
    }
  };
  return (
    <form onSubmit={onSubmit} className={classes["Form"]}>
      <div className={classes["Heading"]}>
        <Typography
          className={classes["Form__Heading"]}
          variant="h5"
          component={"h5"}
        >
          Update your password
        </Typography>
        <Typography
          className={classes["Form__Heading"]}
          variant="body1"
          component={"p"}
        >
          You can change the password of your team members too. So choose a
          strong password.
        </Typography>

        <Divider sx={{ m: "1rem 0" }} />
      </div>
      {data?.page_data.type === "own-page" && (
        <TextField
          type="password"
          required
          variant="standard"
          placeholder="Type your current password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          label={"Current Password"}
        />
      )}
      <TextField
        type="password"
        required
        variant="standard"
        placeholder="Choose a strong password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label={"New Password"}
      />
      <TextField
        type="password"
        label={"Confirm Password"}
        required
        variant="standard"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        placeholder="Type your password again"
      />
      <Button variant="contained" type="submit">
        Update Password
      </Button>
    </form>
  );
};

export default Model_Change_Password;
