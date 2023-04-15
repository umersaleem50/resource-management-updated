import { Component } from "react";
import { GrFormClose as IconClose } from "react-icons/gr";
import {
  HEADING_2,
  Heading_Large,
  Paragraph,
} from "../../Typography/Typography";
import classes from "./Model_Slide.module.scss";
import Overlay from "../Overlay/Overlay";
class Model_Slide extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Overlay onClick={() => this.props.closeModel(false)} />
        <div className={classes["Model"]}>
          <div className={classes["Model__topRow"]}>
            <IconClose
              className={classes["Icon__Close"]}
              onClick={() => this.props.closeModel(false)}
            />
            <Paragraph text={this.props.modelTitle} />
          </div>
          <div className={classes["Model__Container"]}>
            {this.props.children}
          </div>
        </div>
      </>
    );
  }
}

export default Model_Slide;
