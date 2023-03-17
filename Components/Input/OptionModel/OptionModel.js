import classes from "./OptionModel.module.scss";
import { Paragraph } from "../../Typography/Typography";

const OptionModel = (props) => {
  const generate_options = (options) => {
    return options.map((el, i) => {
      return (
        <li
          className={classes.Option}
          onClick={() => {
            el.callback();
            props.closeToggle(false);
          }}
          key={i}
        >
          <Paragraph
            upperCase="capitalize"
            color={el?.color === "red" && "var(--color-error)"}
          >
            {el.title}
          </Paragraph>
        </li>
      );
    });
  };

  return <ul className={classes.Options}>{generate_options(props.options)}</ul>;
};

export default OptionModel;
