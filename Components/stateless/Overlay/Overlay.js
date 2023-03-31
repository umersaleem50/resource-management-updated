import { useState } from "react";
import classes from "./Overlay.module.scss";
const Overlay = (props) => {
  return (
    <div
      className={[
        classes.Overlay,
        props.transparent ? classes["Overlay__transparent"] : "",
      ].join(" ")}
      //   onClick={() => props.toggleModel(false)}
      style={{ zIndex: props.zIndex }}
      onClick={props.onClick}
    ></div>
  );
};

export default Overlay;
