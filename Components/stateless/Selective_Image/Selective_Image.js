import Image from "next/legacy/image";
import classes from "./Selective_Image.module.scss";
import { showNofication } from "../Notification/Notification";
import axios from "axios";
import Router from "next/router";
import { useRef, useState } from "react";
const Selective_Image = (props) => {
  const ImageSizeRef = useRef();
  const [currentImage, setCurrentImage] = useState(props.src);

  const submitImage = async (e) => {
    const imageWidth = ImageSizeRef.current.clientWidth;
    console.log(
      ImageSizeRef.current.innerHeight,
      ImageSizeRef.current.innerWidth,
      ImageSizeRef.current.clientWidth,
      ImageSizeRef.current.clientHeight
    );
    const formData = new FormData();
    formData.append(props.fieldName, e.target.files[0]);
    formData.append("profile_name", props.otherData);
    if (props.autoSizer) {
      formData.append("image_sizes", imageWidth);
    }
    try {
      const updateUser = await axios.patch(props.requestURL, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      if (updateUser)
        showNofication(
          `${props.fieldName} updated, successfully. Reloading page!`,
          "success",
          () => Router.reload()
        );
    } catch (err) {
      console.log(err);
      showNofication(`Failed to change ${props.fieldName}`, "error", () => {});
    }
  };
  return (
    <div
      className={[classes.Selective_Image, props.className].flat().join(" ")}
      ref={ImageSizeRef}
    >
      <label
        // htmlFor={props.isPermission && props.htmlFor}
        style={{ cursor: props.isPermission && "pointer" }}
      >
        <Image
          // src={props.src}
          key={currentImage}
          src={currentImage}
          alt={props.src}
          layout="fill"
          objectFit="cover"
          onClick={props.toggleViewer}
        />
      </label>
      <input
        type={"file"}
        id={props.htmlFor}
        accept={".jpg,.jpeg,.png"}
        className={classes.Input}
        onChange={(e) => submitImage(e)}
      />
    </div>
  );
};

export default Selective_Image;
