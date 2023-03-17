import { useState } from "react";
import classes from "./Overlay.module.scss";
const Overlay = (props) => {
  return (
    <div
      className={classes.Overlay}
      //   onClick={() => props.toggleModel(false)}
      onClick={() => {
        props.onClick();
      }}
    ></div>
  );
};

export default Overlay;
