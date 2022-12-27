import classes from "./Account.module.scss";
import Image from "next/image";
import { Title_Bold, Paragraph } from "../../Typography/Typography";
import { NextRequest, NextResponse } from "next/server";
import Router from "next/router";
const Account = (props) => {
  const reDirectToProfile = (e) => {
    Router.push(`/profile/${props.id}`);
  };

  return (
    <div className={classes.Account} onClick={reDirectToProfile}>
      <div className={classes.Account__image}>
        <Image
          src={`/storage/images/coverPicture/${props.coverImage}`}
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
          {props.member > 0 ? props.member + "+" : props.member}
          <br />
          <Paragraph style={{ fontSize: "1.4rem" }}>Members</Paragraph>
        </Title_Bold>
      </div>
    </div>
  );
};

export default Account;
