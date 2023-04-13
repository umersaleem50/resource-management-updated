import { Component } from "react";
import Image from "next/legacy/image";
import classes from "./ImageGallery.module.scss";
import ImageViewer from "../ImageViewer/ImageViewer";
class ImageGallery extends Component {
  state = {
    currentImageNum: 0,
    toggleViewer: false,
  };

  slideSlideLeft(e) {
    if (this.state.currentImageNum === 0) {
      return this.setState({ currentImageNum: this.props.images.length - 1 });
    }
    return this.setState((prevState) => {
      return { currentImageNum: prevState.currentImageNum - 1 };
    });
  }

  slideSlideRight(e) {
    if (this.state.currentImageNum === this.props.images.length - 1) {
      return this.setState({ currentImageNum: 0 });
    }
    return this.setState((prevState) => {
      return { currentImageNum: prevState.currentImageNum + 1 };
    });
  }

  generateImages(images) {
    return images.map((el, i) => {
      return (
        <div className={classes.ImageGallery__Box}>
          <Image
            src={`${this.props.mainRoute}/${el}`}
            alt={el}
            key={i}
            layout="fill"
            objectFit="cover"
            onClick={() => {
              this.setState({ currentImageNum: i });
            }}
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div className={classes.ImageGallery}>
        {this.state.toggleViewer && (
          <ImageViewer
            imageSrc={`${this.props.mainRoute}/${
              this.props.images[this.state.currentImageNum]
            }`}
            closeViewer={() => this.setState({ toggleViewer: false })}
          />
        )}
        <div className={classes.ImageGallery__Main}>
          <Image
            src={`${this.props.mainRoute}/${
              this.props.images[this.state.currentImageNum]
            }`}
            layout="fill"
            objectFit="cover"
            alt={this.props.src}
            onClick={() => this.setState({ toggleViewer: true })}
          />
        </div>
        <div className={classes.ImageGallery__List}>
          {this.generateImages(this.props.images || [])}
        </div>
      </div>
    );
  }
}

export default ImageGallery;
