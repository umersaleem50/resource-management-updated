import classes from "./Button.module.scss";
import { Paragraph } from "../../Typography/Typography";

const handleStyle = (props) => {
  let customStyle = {};

  if (props.width && props.width === "full") {
    customStyle.width = "100%";
  } else {
    customStyle.width = props.width;
  }

  return customStyle;
};

export const BtnFull = (props) => {
  return (
    <button
      className={[classes.btn, classes.btn__full].join(" ")}
      onClick={props.clicked}
      style={{ ...handleStyle(props), ...props.style }}
    >
      {props.text || props.children}
    </button>
  );
};

export const TextButton = (props) => {
  return (
    <div className={classes.textButton}>
      <Paragraph>{props.children}</Paragraph>
    </div>
  );
};
