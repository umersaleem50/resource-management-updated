import classes from "./Account_Small.module.scss";
import Image from "next/legacy/image";
import { Heading_Large, Paragraph } from "../../Typography/Typography";

const Account_Small = (props) => {
  return (
    <div className={classes.Account_Small}>
      <div className={classes.Account_Small__Image}>
        <Image
          alt={props.alt}
          src={props.src}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={classes.Account_Small__Details}>
        <Paragraph upperCase="capitalize">{props.type} by</Paragraph>
        <Heading_Large upperCase="capitalize">{props.name}</Heading_Large>
      </div>
    </div>
  );
};

export default Account_Small;
