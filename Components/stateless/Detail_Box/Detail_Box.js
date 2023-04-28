import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import Image from "next/image";
import classes from "./Detail_Box.module.scss";
import { grey } from "@mui/material/colors";

const Detail_Box = (props) => {
  return (
    <div
      className={[
        classes["Container"],
        props.reverse ? classes["Container--Left"] : "",
      ].join(" ")}
    >
      <div className={classes["Container__Image"]}>
        <Image
          src={`/storage/images/service/photo/${props.src}`}
          alt={props.src}
          fill
        />
      </div>
      <div
        className={[
          classes["Container__Details"],
          props.reverse ? classes["Container__Details--Left"] : " ",
        ].join(" ")}
      >
        <Typography
          variant="h5"
          component={"h5"}
          fontWeight={"bold"}
          color={grey[900]}
          sx={{ mb: 3 }}
        >
          {props.heading}
        </Typography>
        <Typography variant="body1" component={"p"} color={grey[700]}>
          {props.description}
        </Typography>
      </div>
    </div>
  );
};
Detail_Box.propTypes = {
  src: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
};

export default Detail_Box;
