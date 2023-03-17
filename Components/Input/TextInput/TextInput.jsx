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
        style={props.style}
        defaultValue={props.value}
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
            props.onSelect && props.onSelect(el);
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
        {props.add && (
          <div
            className={classes.SelectInput__Add}
            ref={inputAddRef}
            onClick={(e) => {
              e.target.classList.toggle(classes.SelectInput__Add__animate);
              setToggleInput((prev) => !prev);
            }}
          ></div>
        )}
        {props.add && toggleInput && (
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

export const MultiSelect = forwardRef((props, ref = null) => {
  const [itemSelect, setItemSelected] = useState([]);
  const [isToggle, setToggle] = useState(false);

  const generateResult = (allItems) => {
    // console.log("this", selectedItem);
    return allItems.map((el, i) => {
      return (
        <div
          key={i}
          className={[
            classes.MultiSelect__Item,
            itemSelect.includes(el) && classes.MultiSelect__Item__Selected,
          ].join(" ")}
          onClick={(e) => {
            const newArr = [...itemSelect];
            if (itemSelect.includes(el)) {
              newArr.splice(newArr.indexOf(el), 1);
            } else {
              newArr.push(el);
            }
            setItemSelected(newArr);
          }}
        >
          <Paragraph>{el.split("-").join(" ")}</Paragraph>
        </div>
      );
    });
  };

  return (
    <div className={classes.MultiSelect}>
      <Paragraph>{props.label}</Paragraph>
      <div
        className={classes.MultiSelect__Selected}
        onClick={(e) => setToggle((prev) => !prev)}
      >
        <Paragraph color="var(--color-white)">
          {itemSelect.length} Permissions granted
        </Paragraph>
        <Paragraph style={{ display: "none" }} ref={ref}>
          {itemSelect
            .map((el) => el.toLowerCase().split(" ").join("-"))
            .join(",")}
        </Paragraph>
      </div>
      {isToggle && (
        <div className={classes.MultiSelect__Results}>
          {generateResult(props.category)}
        </div>
      )}
    </div>
  );
});

export const MultiTextBox = forwardRef((props, ref = undefined) => {
  return (
    <div className={classes.MultiTextBox}>
      <label htmlFor={props.htmlFor}>{props.label || props.children}</label>
      <textarea
        style={{ resize: props.resize || "none" }}
        rows={props.rows || 4}
        id={props.htmlFor}
        placeholder={props.placeHolder}
        required={props.required || false}
        ref={ref}
        defaultValue={props.value}
      />
    </div>
  );
});

export const SmallSelect = (props) => {
  const [type, setType] = useState("important");
  const generateOptions = (options) => {
    return options.map((el, i) => {
      return (
        <option
          style={{
            backgroundColor: `${
              el.color === "critical"
                ? "var(--color-red)"
                : "var(--color-yellow)"
            }`,
          }}
          className={[
            classes.SmallSelect__option,
            // el.color ? classes[`SmallSelect__option--${el.color}`] : null,
          ].join(" ")}
          value={el.value || i}
        >
          {el.text}
        </option>
      );
    });
    // .reverse();
  };
  return (
    <select
      className={[classes.SmallSelect, classes[`SmallSelect__${type}`]]
        .flat()
        .join(" ")}
      onInput={(e) => {
        props.onChange(e.target.value * 1);
        setType("critical");
      }}
    >
      {generateOptions(props.options)}
    </select>
  );
};

// export const DateTimeInput = forwardRef((props,ref=undefined) => {
//   return (
//     <div className={classes.DateTimeInput}>
//       <label htmlFor={props.htmlFor}>{props.label || props.children}</label>
//       <input type={props.type === 'just-date'?}/>
//     </div>
//   );
// })
