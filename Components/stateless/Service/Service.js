import Image from "next/legacy/image";
import { Heading_Hero, Paragraph } from "../../Typography/Typography";
import { BtnLink } from "../../Input/Buttons/Button";
import classes from "./Service.module.scss";
import Router from "next/router";
const Service = (props) => {
  const navigate_to_service = (e, id) => {
    return Router.push(`/market/${id}`);
  };

  return (
    <div
      className={[classes.Service, props.className].flat().join(" ")}
      onClick={(e) => navigate_to_service(e, props.id)}
    >
      <Image
        src={`/storage/images/coverPicture/${props.coverPicture}`}
        alt={props.imageAlt}
        objectFit={props.layout || "cover"}
        layout="responsive"
        width={340}
        height={469}
      />
      <div className={classes.Service__details}>
        <Heading_Hero color="var(--color-white)">{props.name}</Heading_Hero>
        <Paragraph color="var(--color-white)">{props.title}</Paragraph>
        <BtnLink text="Learn More" href={`/market/${props.id}`} />
      </div>
    </div>
  );
};

export default Service;
