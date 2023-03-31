import React from "react";
import classes from "./DateInput.module.scss";
const DateInput = React.forwardRef((props, ref = null) => {
  return (
    <input
      type={"datetime-local"}
      id={props.id}
      className={classes["DateInput"]}
      ref={ref}
    />
  );
});

module.exports = { DateInput };
