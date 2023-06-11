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
import Model from "../../Components/stateless/Model/Model";
import { useState } from "react";
import { getSession } from "next-auth/react";
import Form_Create_New_Account from "../../Components/AllModels/team/Form_Create_New_Account";
import { red } from "@mui/material/colors";
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
  console.log(props);
  const branches = !props.isError && generate_braches_data(props.data.team);
  const [isModelOpen, setIsModelOpen] = useState(false);

  return (
    <>
      <MainContainer navbar title="Resource Management - My Team">
        <Model toggle={isModelOpen} onClose={() => setIsModelOpen(false)}>
          <Form_Create_New_Account
            closeModel={() => setIsModelOpen(false)}
            token={props.token}
            otherData={{ permissions: props.data.permissions }}
          />
        </Model>
        <Section>
          <div className={classes.Top}>
            <Typography variant="h6" component={"h6"}>
              My Team
            </Typography>
            {props.data.permissions.includes("have-team") && (
              <div className={classes.Top__right}>
                <Button
                  variant="contained"
                  startIcon={<Add></Add>}
                  onClick={() => {
                    setIsModelOpen(true);
                  }}
                >
                  Create sub account
                </Button>
              </div>
            )}
          </div>
          <div className={classes.Container}>
            {branches.map((el, i) => {
              return (
                <Branch key={i} branch={el.branch} team={el.team}></Branch>
              );
            })}
          </div>
        </Section>
      </MainContainer>
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    const session = await getSession(context);
    const requestObj = await get_team_request(session.token);
    return {
      props: {
        data: requestObj,
      },
    };
  } catch (error) {
    return {
      props: {
        isError: true,
        errorMessage: error.message,
      },
    };
  }
}

export default Team;
