import classes from "./Account.module.scss";
import Image from "next/image";
import { Title_Bold, Paragraph } from "../../Typography/Typography";

const Account = (props) => {
  return (
    <div className={classes.Account}>
      <div className={classes.Account__image}>
        <Image
          src={`/storage/images/coverPicture/${
            "test.jpeg" || props.coverImage
          }`}
          objectFit="cover"
          height={160}
          width={315}
          alt="Cover Picture"
        />
      </div>
      {props.profilePicture && (
        <div className={classes.Account__profilePicture}>
          <Image
            src={`/storage/images/profilePicture/${props.profilePicture}`}
            objectFit="cover"
            height={75}
            width={75}
            alt="Profile Picture"
          />
        </div>
      )}
      <div className={classes.Account__details}>
        <Title_Bold>{props.fullName}</Title_Bold>
        <Title_Bold style={{ textTransform: "capitalize" }}>
          {props.profession && props.profession.join(", ")}
        </Title_Bold>
        <Paragraph style={{ width: "70%", textTransform: "capitalize" }}>
          {props.address || "do something for the address"}
        </Paragraph>
        <Title_Bold
          style={{ fontSize: "2.4rem", color: "var(--color-font-grey)" }}
        >
          93+
          <br />
          <Paragraph style={{ fontSize: "1.4rem" }}>Members</Paragraph>
        </Title_Bold>
      </div>
    </div>
  );
};

export default Account;
