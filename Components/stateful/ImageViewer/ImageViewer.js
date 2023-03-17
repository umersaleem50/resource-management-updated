import Image from "next/legacy/image";
import { Component } from "react";
import { BtnClose, BtnFull } from "../../Input/Buttons/Button";
import Overlay from "../../stateless/Overlay/Overlay";
import classes from "./ImageViewer.module.scss";
import { BiEdit as IconEdit } from "react-icons/bi";

class ImageViewer extends Component {
  render() {
    return (
      <div className={classes.ImageViewer} clicked={this.props.closeViewer}>
        <BtnFull
          className={classes.IconEdit}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <IconEdit className={classes.IconEdit__Icon} /> Edit
        </BtnFull>
        <BtnClose
          className={[classes.Close_Btn]}
          onClick={this.props.closeViewer}
        />
        <div className={classes.ImageViewer__Box}>
          <Image
            src={this.props.imageSrc}
            layout="fill"
            objectFit="contain"
            onClick={this.props.closeViewer}
          />
        </div>
        <Overlay onClick={this.props.closeViewer} />
      </div>
    );
  }
}

export default ImageViewer;
