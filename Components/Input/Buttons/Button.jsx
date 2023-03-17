import classes from "./Button.module.scss";
import { Paragraph } from "../../Typography/Typography";
import Image from "next/legacy/image";
import { useState } from "react";
import Link from "next/link";

const handleClasses = (props, ...otherclasses) => {
  const classesArray = otherclasses;
  classesArray.push(props.className);
  if (props.dark) {
    classesArray.push(classes["btn--dark"]);
  }
  return classesArray.flat().join(" ");
};

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
      className={handleClasses(props, classes["btn"], classes["btn--full"])}
      onClick={props.clicked}
      style={{ ...handleStyle(props), ...props.style }}
      disabled={props.disabled}
    >
      {props.text || props.children}
    </button>
  );
};

export const TextButton = (props) => {
  return (
    <div className={handleClasses(props, classes["btn--text"])}>
      <Paragraph>{props.children}</Paragraph>
    </div>
  );
};

export const BtnLink = (props) => {
  return (
    <Link
      className={[classes.btn, classes.BtnLink].join(" ")}
      href={props.href}
    >
      {props.text || props.children}
    </Link>
  );
};

export const BtnOptions = (props) => {
  const [isToggle, setToggle] = useState(false);
  const options = props.options;
  // console.log(options);

  const generate_options = (options) => {
    return options.map((el, i) => {
      return (
        <li
          className={classes.BtnOptions__option}
          onClick={() => {
            el.callback();
            setToggle(false);
          }}
          key={i}
        >
          <Paragraph
            upperCase="capitalize"
            color={
              el.title.toLowerCase().includes("remove") && "var(--color-error)"
            }
          >
            {el.title}
          </Paragraph>
        </li>
      );
    });
  };

  return (
    <div className={classes.BtnOptions}>
      <button onClick={() => setToggle((prev) => !prev)}>
        <Image
          src={"/assets/fourdot.svg"}
          width={20}
          height={20}
          objectFit="cover"
        />
      </button>
      {isToggle && (
        <ul className={classes.BtnOptions__options}>
          {generate_options(options)}
        </ul>
      )}
    </div>
  );
};

export const BtnClose = (props) => {
  return (
    <button
      className={[classes.Btn__Close, props.className].flat().join(" ")}
    ></button>
  );
};
