import { useState } from "react";
import classes from "./Model.module.scss";
const Model = (props) => {
  //   const [toggle, setToggle] = useState(props.showModel);
  return (
    <div className={[classes.main, classes.main__show].join(" ")}>
      <div className={classes.Model}>
        <div
          className={classes.Model__Cross}
          onClick={() => props.toggleModel(false)}
        ></div>
        {props.children}
      </div>
      <div
        className={classes.Overlay}
        onClick={() => props.toggleModel(false)}
      ></div>
    </div>
  );
};

export default Model;
