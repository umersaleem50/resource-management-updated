import classes from "./Model_Create_Report.module.scss";
const Model_Create_Report = (props) => {
  return (
    <form className={classes["Form"]} onSubmit={onSubmit}>
      <Typography
        className={classes["Form__Heading"]}
        variant="h5"
        component={"h5"}
      >
        Assign the task
      </Typography>
      <Typography
        className={classes["Form__Heading"]}
        variant="body1"
        component={"p"}
      >
        Assign the task to your team member, you can reassign the task through
        report
      </Typography>
    </form>
  );
};
