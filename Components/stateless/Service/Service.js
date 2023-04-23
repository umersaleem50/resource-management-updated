import Image from "next/legacy/image";

import classes from "./Service.module.scss";
import Router from "next/router";
import { Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export const ServiceTemplate = () => {
  return (
    <div
      className={classes["Service"]}
      style={{ backgroundColor: grey[500] }}
      // onClick={(e) => navigate_to_service(e, props.id)}
    >
      {" "}
      <Image
        src={"/assets/service.jpg"}
        alt={"no service"}
        objectFit={"cover"}
        layout="responsive"
        width={340}
        height={469}
      />
      <div className={classes.Service__details}>
        <Typography variant="h6" component={"h6"} color={grey["A200"]}>
          {"No Service or Product found!"}
        </Typography>
        <Typography variant="body1" component={"p"} color={grey["A200"]}>
          {`You're currently having no service or product to offer!`}
        </Typography>
      </div>
    </div>
  );
};

const Service = (props) => {
  const navigate_to_service = (e, id) => {
    return Router.push(`/market/${id}`);
  };

  return (
    <div
      className={[classes.Service, props.className].flat().join(" ")}
      // onClick={(e) => navigate_to_service(e, props.id)}
    >
      <Image
        src={
          (props.coverPicture &&
            `/storage/images/coverPicture/${props.coverPicture}`) ||
          "/assets/service.jpg"
        }
        alt={props.imageAlt}
        objectFit={props.layout || "cover"}
        layout="responsive"
        width={340}
        height={469}
      />
      <div className={classes.Service__details}>
        <Typography variant="h6" component={"h6"} color={grey["A200"]}>
          {props.name}
        </Typography>
        <Typography variant="body1" component={"p"} color={grey["A200"]}>
          {props.title}
        </Typography>
        <Button type="button" variant="contained">
          More Details
        </Button>
      </div>
    </div>
  );
};

export default Service;
