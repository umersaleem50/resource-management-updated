import { Typography } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import classes from "./Welcome_Screen.module.scss";
import Image from "next/image";
import PropTypes from "prop-types";

const Welcome_Screen = (props) => {
  return (
    <div className={classes["Welcome"]}>
      <div className={classes["Welcome__left"]}>
        <Typography
          variant="h4"
          component={"h4"}
          color={grey[700]}
          className={classes["Heading"]}
          fontWeight={800}
        >
          Welcome back {props.firstName}!
        </Typography>
        <Typography color={blue[500]}>
          You have {props.taskQunatity} new tasks of days!
        </Typography>
      </div>
      <div className={classes["Welcome__right"]}>
        <Image
          src="/assets/Girl.svg"
          alt="Adventure"
          fill
          objectFit="cover"
          className={classes["Welcome__right__image"]}
        />
      </div>
    </div>
  );
};

Welcome_Screen.propTypes = {
  firstName: PropTypes.string,
  taskQunatity: PropTypes.number,
};

export default Welcome_Screen;
