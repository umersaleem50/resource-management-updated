import Image from "next/image";
import classes from "./ImageSlider.module.scss";
import { useEffect, useState } from "react";

const ImageSlider = (props) => {
  // const images = [...props.images];
  const [currentImage, setCurrentImage] = useState(0);

  const INTERVAL = 5000;
  let timer;

  const generateTimer = () => {
    return setInterval(() => {
      // console.log("this is length", props.images);
      console.log(props.images.length);
      console.log("the current", currentImage);
      if (currentImage >= props.images.length - 1) {
        console.log(currentImage);
        setCurrentImage(0);
      } else if (currentImage < props.images.length - 1) {
        setCurrentImage((prev) => {
          console.log(prev);
          return prev + 1;
        });
      }
    }, INTERVAL);
  };

  useEffect(() => {
    // const interval = generateTimer();
    // return () => clearInterval(interval);
  }, []);

  const generateImages = (images) => {
    return images.map((el, i) => {
      return (
        <div
          className={[
            classes.ImageBox,
            i === currentImage ? classes.ImageBox__active : "",
          ].join(" ")}
          key={i}
        >
          <Image
            fill
            objectFit="cover"
            sizes="30vh"
            src={el}
            alt={`Image ${i + 0}`}
            // style={{ zIndex: i === currentImage ? "1" : "25" }}
          />
        </div>
      );
    });
  };

  const generateDots = (images) => {
    return (
      <div className={classes.Dots}>
        {images.map((el, i) => {
          return (
            <div
              onClick={() => {
                setCurrentImage(i);
              }}
              className={[
                classes.Dot,
                i === currentImage ? classes.Dot__active : "",
              ].join(" ")}
            ></div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={classes.ImageSlider}>
      <div className={classes.Overlay}></div>
      {generateImages(props.images)}
      {generateDots(props.images)}
    </div>
  );
};

export default ImageSlider;
