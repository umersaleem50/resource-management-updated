import classes from "./Model_Add_Service.module.scss";
import { Typography, Divider, TextField } from "@mui/material";
const Model_Add_Service = (props) => {
  const onSubmit = () => {};
  return (
    <form onSubmit={onSubmit} className={classes["Form"]}>
      <div className={classes["Heading"]}>
        <Typography
          className={classes["Form__Heading"]}
          variant="h5"
          component={"h5"}
        >
          Add Service or product
        </Typography>
        <Typography
          className={classes["Form__Heading"]}
          variant="body1"
          component={"p"}
        >
          You can offer your services and products here!
        </Typography>

        <Divider sx={{ m: "1rem 0" }} />
      </div>
      <TextField
        type="email"
        required
        variant="standard"
        placeholder="Enter a valid email"
        label={"Email"}
      />
      <TextField
        type="text"
        label={"First Name"}
        required
        variant="standard"
        placeholder="Enter your first name"
      />
    </form>
  );
};

export default Model_Add_Service;
