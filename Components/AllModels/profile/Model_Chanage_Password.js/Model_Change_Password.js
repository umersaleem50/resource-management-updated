import classes from "./Model_Change_Password.module.scss";
import { Typography, TextField, Divider } from "@mui/material";
const Model_Change_Password = (props) => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
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
    </form>
  );
};

export default Model_Change_Password;
