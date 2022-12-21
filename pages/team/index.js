// import axios from "axios";
import classes from "./Team.module.scss";
import axios from "axios";
import MainContainer from "../../Components/stateless/MainContainer/MainContainer";
import Section from "../../Components/stateless/Section/Section";
import {
  Heading_Large,
  Heading_Tiny,
} from "../../Components/Typography/Typography";
import Account from "../../Components/stateless/Account/Account";
import { BtnFull } from "../../Components/Input/Buttons/Button";

const Branch = (props) => {
  return (
    <div className={classes.Branch}>
      <Heading_Large style={{ textTransform: "capitalize" }}>
        {`${props.branch}s`}
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
              ></Account>
            );
          })}
      </div>
    </div>
  );
};

const createBranches = (team) => {
  const branchesArray = team
    .map((el, i) => el.category)
    .filter((v, i, a) => a.indexOf(v) === i);

  const branches = branchesArray.map((el, i) => {
    return {
      branch: el,
      team: team.filter((acc, i) => acc.category === el),
    };
  });

  return branches;
};

const Team = (props) => {
  console.log(props);
  //   const categories = props.team.map((el, i) => el.category);
  //   console.log(categories);
  const branches = createBranches(props.data.team);
  return (
    <MainContainer navbar title="Resource Management - My Team">
      <Section>
        <div className={classes.Top}>
          <Heading_Tiny>My Team</Heading_Tiny>
          <div className={classes.Top__right}>
            <BtnFull>Create an account</BtnFull>
          </div>
        </div>
        <div className={classes.Container}>
          {branches.map((el, i) => {
            return <Branch branch={el.branch} team={el.team}></Branch>;
          })}
        </div>
      </Section>
    </MainContainer>
  );
};

export async function getServerSideProps(context) {
  let team;
  console.log("this is context", context.req.secure);
  const protocol = context.req.secure ? "https" : "http";
  try {
    team = await axios({
      //   url: "http://localhost:3000/api/profile/",
      url: `${protocol}://${context.req.headers.host}/api/profile/`,

      params: {
        select: "team,email",
        populate:
          "coverPicture,profession,firstName,lastName,team,email,category,profilePicture",
      },
      data: { token: context.req.cookies.jwt },
    });
    // console.log(team);
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
    };
  }

  return { props: { data: team.data.data } };
}

export default Team;
