import { Component } from "react";
import React from "react";
import { Paragraph } from "../../Typography/Typography";
import classes from "./SelectInput.module.scss";
import { IoIosArrowDown as IconArrowDown } from "react-icons/io";
import Overlay from "../../stateless/Overlay/Overlay";

class SelectInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleOptions: false,
      selected: this.props?.options[0] || "",
      selectedColor: "var(--color-blue)",
    };
    this.options = [];
  }

  generateOptions(options) {
    return options.map((el, i) => {
      return (
        <li
          className={classes["SelectInput__Option"]}
          onClick={() => {
            this.setState((prev) => {
              return {
                selected: el,
                toggleOptions: !prev.toggleOptions,
                selectedColor: el.color,
              };
            });
          }}
          key={i}
          //   style={{ backgroundColor: el.color || "var(--color-blue)" }}
        >
          <Paragraph color="var(--color-font)">{el.text}</Paragraph>
        </li>
      );
    });
  }

  render() {
    return (
      <div className={classes["SelectInput"]}>
        {this.state.toggleOptions && (
          <Overlay
            onClick={() => this.setState({ toggleOptions: false })}
            zIndex="20"
            transparent
          />
        )}
        <div
          className={classes["SelectInput__Selected"]}
          style={{ backgroundColor: this.state.selectedColor }}
          onClick={() =>
            this.setState((prev) => {
              return { toggleOptions: !prev.toggleOptions };
            })
          }
        >
          <Paragraph color="var(--color-white)" ref={this.props.ref}>
            {this.state.selected.text}
          </Paragraph>
          <IconArrowDown className={classes["Icon__ArrowDown"]} />
        </div>
        <ul className={classes["SelectInput__Options"]}>
          {this.state.toggleOptions && this.generateOptions(this.props.options)}
        </ul>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <SelectInput ref={ref} {...props} />
));
