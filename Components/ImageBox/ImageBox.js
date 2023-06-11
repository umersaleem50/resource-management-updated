import { Component, Fragment } from "react";
import Image from "next/image";
import classes from "./ImageBox.module.scss";
import Overlay from "../stateless/Overlay/Overlay";
import { IoMdClose as IconClose } from "react-icons/io";
import { FiEdit as IconEdit } from "react-icons/fi";
import axios from "axios";
import Router from "next/router";
import { Button } from "@mui/material";
import { showSnackBar } from "../../next-utils/helper_functions";
import { enqueueSnackbar } from "notistack";
import { useSession } from "next-auth/react";

class ImageBox extends Component {
  constructor(props) {
    super(props);
    this.state = { isToggle: false };
  }

  async submitImage(e) {
    console.log(this.props.token);
    if (!this.props.canupdate) return;
    const formData = new FormData();
    formData.append(this.props.htmlFor, e.target.files[0]);
    // formData.append("profile_name", this.props.otherData);
    try {
      const updateUser = await axios.patch(this.props.requesturl, formData, {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${this.props.token}`,
        },
      });

      if (updateUser)
        showSnackBar(
          enqueueSnackbar,
          `${this.props.htmlFor} updated, successfully. Reloading page!`,
          "success"
        );
      Router.reload();
    } catch (err) {
      console.log(err);
      showSnackBar(
        enqueueSnackbar,
        `Failed to change ${this.props.htmlFor}`,
        "error"
      );
    }
  }

  render() {
    return (
      <Fragment>
        <Image
          // {...this.props}
          src={this.props.src}
          fill={this.props.fill || "cover"}
          className={[this.props.className, classes["ImageBox"]]
            .flat()
            .join(" ")}
          onClick={() => this.setState({ isToggle: true })}
        />
        {this.props.canupdate && (
          <label htmlFor={this.props.htmlFor}>
            <IconEdit
              className={[classes["Icon"], classes["Icon--Edit"]].join(" ")}
            />
          </label>
        )}

        {this.props.canupdate && (
          <input
            type={"file"}
            id={this.props.htmlFor}
            accept={".jpg,.jpeg,.png"}
            className={classes["Input"]}
            onChange={(e) => this.submitImage(e)}
          />
        )}

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
              <Button
                className={[classes["FancyBox__Icon"]].join()}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                variant="contained"
              >
                upload
                <input
                  type={"file"}
                  hidden
                  id={this.props.htmlFor}
                  accept={".jpg,.jpeg,.png"}
                  className={classes["Input"]}
                  onChange={(e) => this.submitImage(e)}
                />
              </Button>
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
