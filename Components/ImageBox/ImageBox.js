import { Component, Fragment } from "react";
import Image from "next/image";
import classes from "./ImageBox.module.scss";
import Overlay from "../stateless/Overlay/Overlay";
import { IoMdClose as IconClose } from "react-icons/io";
import { FiEdit as IconEdit } from "react-icons/fi";
import { BtnFull } from "../Input/Buttons/Button";
import { showNofication } from "../stateless/Notification/Notification";
import axios from "axios";
import Router from "next/router";

class ImageBox extends Component {
  constructor(props) {
    super(props);
    this.state = { isToggle: false };
  }

  componentDidUpdate() {
    console.log("yup its updated");
  }

  async submitImage(e) {
    const formData = new FormData();
    formData.append(this.props.htmlFor, e.target.files[0]);
    // formData.append("profile_name", this.props.otherData);
    try {
      const updateUser = await axios.patch(this.props.requesturl, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      if (updateUser)
        showNofication(
          `${this.props.htmlFor} updated, successfully. Reloading page!`,
          "success",
          () => Router.reload()
        );
    } catch (err) {
      console.log(err);
      showNofication(
        `Failed to change ${this.props.htmlFor}`,
        "error",
        () => {}
      );
    }
  }

  render() {
    return (
      <Fragment>
        <Image
          {...this.props}
          fill={this.props.fill || "cover"}
          className={[this.props.className, classes["ImageBox"]]
            .flat()
            .join(" ")}
          onClick={() => this.setState({ isToggle: true })}
        />
        <label htmlFor={this.props.htmlFor}>
          <IconEdit
            className={[classes["Icon"], classes["Icon--Edit"]].join(" ")}
          />
        </label>

        <input
          type={"file"}
          id={this.props.htmlFor}
          accept={".jpg,.jpeg,.png"}
          className={classes["Input"]}
          onChange={(e) => this.submitImage(e)}
        />

        {this.state.isToggle && (
          <div
            className={classes["FancyBox"]}
            onClick={(e) => {
              e.stopPropagation();
              this.setState({ isToggle: false });
            }}
          >
            <div className={classes["FancyBox__Image"]}>
              <Image
                src={this.props.src}
                alt={this.props.alt}
                fill="contain"
                objectFit="contain"
              />
              <BtnFull
                className={[classes["FancyBox__Icon"]].join()}
                clicked={(e) => e.stopPropagation()}
              >
                <label htmlFor={this.props.htmlFor}>
                  Edit Photo
                  <IconEdit style={{ marginLeft: ".5rem" }} />
                </label>
              </BtnFull>
            </div>
            <IconClose
              className={[classes["Icon"], classes["Icon--Close"]].join(" ")}
              onClick={() => this.setState({ isToggle: false })}
            />

            <Overlay onClick={() => this.setState({ isToggle: false })} />
          </div>
        )}
      </Fragment>
    );
  }
}

export default ImageBox;
