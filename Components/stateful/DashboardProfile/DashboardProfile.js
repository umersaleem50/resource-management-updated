import Image from "next/legacy/image";
import Router from "next/router";
import Meter from "../../stateless/Meter/Meter";
import {
  Heading_Large,
  Heading_Tiny,
  Paragraph,
} from "../../Typography/Typography";
import classes from "./DashboardProfile.module.scss";
const DashboardProfile = (props) => {
  return (
    <div className={classes.Dashboard}>
      <Heading_Tiny
        bold="600"
        style={{ height: "2.5rem", display: "flex", alignItems: "center" }}
      >
        Your Performance
      </Heading_Tiny>
      <div className={classes.Dashboard__Container}>
        <div className={classes.Dashboard__Stats}>
          <Meter
            value="75"
            title="Task completion"
            color="var(--color-green)"
          />
          <Meter
            value="25"
            title="Task incomplete"
            color="var(--color-error)"
          />
          <Meter value="75" title="Task completion" />
        </div>
        <div
          className={classes.Dashboard__Profile}
          onClick={() => Router.push(`/profile/${props.profile.id}`)}
        >
          <div className={classes.Dashboard__Profile__Top}>
            <div className={classes.Dashboard__Profile__Top__Image}>
              <Image
                src={
                  "/storage/images/profilePicture/" +
                  props.profile?.profilePicture
                }
                alt={props.profile?.fullName}
                width={80}
                height={80}
              />
            </div>
            <Heading_Large>{props.profile?.fullName}</Heading_Large>
          </div>
          <div className={classes.Dashboard__Profile__Other}>
            <Paragraph upperCase="uppercase">
              {props.profile?.profession}
            </Paragraph>
            <Paragraph upperCase="uppercase">
              {props.profile?.otherDetails.street +
                " ," +
                props.profile?.otherDetails.country}
            </Paragraph>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
