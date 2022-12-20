import { forwardRef } from "react";
import classes from "./Typography.module.scss";
const handleStyle = (props) => {
  const style = { ...props.style };
  if (props.bold) {
    style.bold = props.bold === "" ? "bold" : props.bold;
  }
  if (props.upperCase) {
    style.upperCase = props.upperCase === "" ? "uppercase" : props.upperCase;
  }
  if (props.color) {
    style.color = props.color;
  }

  return style;
};

export const Heading_Secondary = (props) => {
  return (
    <h4
      className={classes.Heading_Secondary}
      style={{ ...handleStyle(props), ...props.otherStyle }}
    >
      {props.text || props.children}
    </h4>
  );
};

export const Paragraph = forwardRef((props, ref) => {
  return (
    <p ref={ref} className={classes.Paragraph} style={handleStyle(props)}>
      {props.text || props.children}
    </p>
  );
});

export const Heading_Tiny = (props) => {
  return (
    <h6 className={classes.Heading_Tiny} style={handleStyle(props)}>
      {props.text || props.children}
    </h6>
  );
};

export const Heading_Large = (props) => {
  return (
    <h4 className={classes.Heading_Large} style={handleStyle(props)}>
      {props.text || props.children}
    </h4>
  );
};

export const Title_Bold = (props) => {
  return (
    <h6 className={classes.Title_Bold} style={handleStyle(props)}>
      {props.text || props.children}
    </h6>
  );
};
