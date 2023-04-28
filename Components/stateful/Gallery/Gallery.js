import Image from "next/image";
import { useState } from "react";
import PropTypes from "prop-types";
import classes from "./Gallery.module.scss";
import Fancybox from "../../stateless/Fancybox/Fancybox";
import ImageBox from "../../ImageBox/ImageBox";

const Gallery = (props) => {
  const [currentImageSrc, setCurrentImageSrc] = useState(props.images[0]);

  function genreateOtherImages(images) {
    return images.map((image, i) => {
      return (
        <div
          key={i}
          className={classes["Gallery__Image"]}
          onClick={() => setCurrentImageSrc(image)}
        >
          <Image
            fill
            src={`/storage/images/gallery/${image}`}
            alt={"Gallery " + (i + 1)}
          />
        </div>
      );
    });
  }

  return (
    <div className={classes["Gallery"]}>
      <div className={classes["Gallery__CurrentImage"]}>
        <ImageBox
          src={`/storage/images/gallery/${currentImageSrc}`}
          fill
          alt="Gallery 1"
        />
      </div>
      <div className={classes["Gallery__Other"]}>
        {genreateOtherImages(props.images)}
      </div>
    </div>
  );
};

Gallery.propTypes = {
  images: PropTypes.array,
};

export default Gallery;
