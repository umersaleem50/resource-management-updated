import { useRef, useState } from "react";
import { forwardRef } from "react";
import { Paragraph } from "../../Typography/Typography";
import classes from "./TextInput.module.scss";
import { MdOutlineKeyboardArrowDown as IconArrowDown } from "react-icons/md";

export const TextInputLabel = forwardRef((props, ref = null) => {
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
        minLength={(props.type === "password" && props.minLength) || null}
        required={props.required}
      />
    </div>
  );
});

export const Checkbox = (props) => {
  return (
    <div className={classes.Checkbox}>
      <input type={"checkbox"} id={props.htmlFor} />
      <label htmlFor={props.htmlFor}>{props.label || props.children}</label>
    </div>
  );
};

export const SelectInput = forwardRef((props, ref = null) => {
  const [category, setCategory] = useState(props.category);
  const [selected, setSelected] = useState(props.category[0]);
  const [toggle, setToggle] = useState(false);
  const [toggleInput, setToggleInput] = useState(false);
  const inputAddRef = useRef();
  const generateResult = (items) => {
    return items.map((el, i) => {
      return (
        <div
          className={classes.SelectInput__Item}
          key={i}
          onClick={() => {
            setSelected(el);
            setToggleInput(false);
            setToggle(false);
          }}
        >
          <Paragraph style={{ textTransform: "capitalize" }}>{el}</Paragraph>
        </div>
      );
    });
  };

  return (
    <div className={classes.SelectInput}>
      <Paragraph className={classes.SelectInput__label}>
        {props.label}
      </Paragraph>
      <div
        className={classes.SelectInput__Selected}
        onClick={() => {
          setToggle(true);
        }}
      >
        <div
          className={classes.SelectInput__Add}
          ref={inputAddRef}
          onClick={(e) => {
            e.target.classList.toggle(classes.SelectInput__Add__animate);
            setToggleInput((prev) => !prev);
          }}
        ></div>
        {toggleInput && (
          <input
            className={classes.SelectInput__Input}
            type={"text"}
            value={selected}
            placeholder="Type the category"
            onBlur={(e) => {
              setToggle(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                inputAddRef.current.classList.remove(
                  classes.SelectInput__Add__animate
                );
                // setSelected(e.target.value);
                setToggleInput(false);
                setToggle(false);
              }
            }}
            onChange={(e) => setSelected(e.target.value)}
          />
        )}
        <Paragraph
          style={{ textTransform: "capitalize" }}
          color={"var(--color-white)"}
          ref={ref}
        >
          {selected}
        </Paragraph>
        <IconArrowDown className={classes.SelectInput__Icon} />
      </div>
      <div className={classes.SelectInput__Items}>
        {toggle && generateResult(category)}
      </div>
    </div>
  );
});
