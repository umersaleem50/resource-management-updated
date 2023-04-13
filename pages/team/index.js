// import axios from "axios";
import {
  protected_route_next,
  useJWTToken,
} from "../../next-utils/login_validation";
import { get_team_request } from "../../services/pages/team";
import MainContainer from "../../Components/stateless/MainContainer/MainContainer";
import Section from "../../Components/stateless/Section/Section";
import classes from "./Team.module.scss";
import Branch from "../../Components/stateless/Branch/Branch";
import { Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
const generate_braches_data = (team) => {
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
  const branches = generate_braches_data(props.data.team);

  console.log(props);
  return (
    <MainContainer navbar title="Resource Management - My Team">
      <Section>
        <div className={classes.Top}>
          <Typography variant="h6" component={"h6"}>
            My Team
          </Typography>
          {
            // props.data.permissions.includes("have-team") &&
            <div className={classes.Top__right}>
              <Button variant="contained" startIcon={<Add></Add>}>
                Create sub account
              </Button>
            </div>
          }
        </div>
        <div className={classes.Container}>
          {branches.map((el, i) => {
            return <Branch key={i} branch={el.branch} team={el.team}></Branch>;
          })}
        </div>
      </Section>
    </MainContainer>
  );
};

export async function getServerSideProps(context) {
  const { token } = useJWTToken(context);
  try {
    await protected_route_next(context);
    const requestObj = await get_team_request(token);

    return {
      props: {
        data: requestObj.data,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
}

export default Team;
