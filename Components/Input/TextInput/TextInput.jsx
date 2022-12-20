import { forwardRef } from "react";
import { Paragraph } from "../../Typography/Typography";
import classes from "./TextInput.module.scss";

export const TextInputLabel = forwardRef((props, ref) => {
  return (
    <div className={classes.TextInputLabel}>
      <label htmlFor={props.htmlFor}>{props.label}</label>
      <input
        ref={ref}
        className="input"
        type={props.type || "text"}
        name={props.htmlFor}
        id={props.htmlFor}
        placeholder={props.placeHolder}
      />
    </div>
  );
});

// export const TextInputLabel = (props) => {
//   return (
//     <div className={classes.TextInputLabel}>
//       <label htmlFor={props.htmlFor}>{props.label}</label>
//       <input
//         className="input"
//         type={props.type || "text"}
//         name={props.htmlFor}
//         id={props.htmlFor}
//         placeholder={props.placeHolder}
//       />
//     </div>
//   );
// };

export const Checkbox = (props) => {
  return (
    <div className={classes.Checkbox}>
      <input type={"checkbox"} id={props.htmlFor} />
      <label htmlFor={props.htmlFor}>{props.label || props.children}</label>
    </div>
  );
};

// export const BtnFull = (props) => {
//   return (
//     <button
//       className={[classes.btn, classes.btn__full].join(" ")}
//       style={{ width: props.full ? "100%" : "auto" }}
//       onClick={props.clicked}
//     >
//       {props.text || props.children}
//     </button>
//   );
// };

// export const TextButton = (props) => {
//   return (
//     <div className={classes.textButton}>
//       <Paragraph>{props.children}</Paragraph>
//     </div>
//   );
// };
