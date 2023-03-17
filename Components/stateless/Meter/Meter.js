import { HEADING_2, Paragraph } from "../../Typography/Typography";
import classes from "./Meter.module.scss";
const Meter = (props) => {
  return (
    <div className={classes["Meter"]}>
      <div
        className={classes["Meter__Progress"]}
        style={{
          background: `conic-gradient(${props.color || "var(--color-blue)"} ${
            props.value * 3.6
          }deg, white 0deg)`,
        }}
      ></div>
      <div className={classes["Meter__Details"]}>
        <HEADING_2>{props.value}%</HEADING_2>
        <Paragraph style={{ fontSize: "1.2rem" }}>{props.title}</Paragraph>
      </div>
    </div>
  );
};

export default Meter;
