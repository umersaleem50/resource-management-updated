import { Heading_Large } from "../../Typography/Typography";
import Account from "../Account/Account";
import classes from "./Branch.module.scss";
const Branch = (props) => {
  return (
    <div className={classes.Branch}>
      <Heading_Large style={{ textTransform: "capitalize" }}>
        {(props.branch && `${props.branch}s`) || "Higher Authorities"}
      </Heading_Large>
      <div className={classes.Branch__Sub}>
        {props.team &&
          props.team.map((el, i) => {
            return (
              <Account
                profilePicture={el.profilePicture}
                coverImage={el.coverPicture}
                fullName={el.fullName}
                profession={el.profession}
                address={el.address}
                key={i}
                id={el.id}
                member={el?.team?.length}
              ></Account>
            );
          })}
      </div>
    </div>
  );
};

export default Branch;
