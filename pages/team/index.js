// import axios from "axios";
import classes from "./Team.module.scss";
import axios from "axios";
import MainContainer from "../../Components/stateless/MainContainer/MainContainer";
import Section from "../../Components/stateless/Section/Section";
import { Heading_Tiny } from "../../Components/Typography/Typography";

import { BtnFull } from "../../Components/Input/Buttons/Button";
import Model from "../../Components/stateless/Model/Model";
import {} from "../../Components/Input/TextInput/TextInput";
import { useState } from "react";

import Notification from "../../Components/stateless/Notification/Notification";
import { login_validation } from "../../next-utils/login_validation";
import SignupModel from "../../Components/AllModels/team/_signup_model";
import Branch from "../../Components/stateless/Branch/Branch";

const Member = require("../../Express-api/Models/member");

const generate_branches_list = (team) => {
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

const sendSignupRequest = async (requestObj, id) => {
  const result = await axios({
    url: `/api/auth/signup/${id}`,
    method: "post",

    data: { ...requestObj, passwordConfirm: requestObj.password },
  });

  return result;
};

const Team = (props) => {
  let [showModel, setShowModel] = useState(false);
  const [teamMember, setTeamMember] = useState(props.data.team);

  const showModelPropsFunction = (type) => {
    setShowModel(type);
  };

  const branches = generate_branches_list(teamMember);

  return (
    <MainContainer navbar title="Resource Management - My Team">
      <Notification type="success" />
      {showModel && (
        <Model toggleModel={showModelPropsFunction}>
          <SignupModel
            otherData={{
              id: props.data.id,
              setShowModel,
              permissions: props.data.permissions,
            }}
            category={branches.map((el) => el.branch)}
            showModel
          ></SignupModel>
        </Model>
      )}
      <Section>
        <div className={classes.Top}>
          <Heading_Tiny>My Team</Heading_Tiny>
          {props.data.permissions && (
            // props.data.permissions.includes("have-team")
            //  &&
            <div className={classes.Top__right}>
              <BtnFull clicked={() => setShowModel(true)}>
                Create an account
              </BtnFull>
            </div>
          )}
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

export async function getServerSideProps({ req }) {
  const checkIsLogin = login_validation(req);
  if (!checkIsLogin.isLogged) {
    return checkIsLogin.redirect;
  }

  const data = await Member.findById(checkIsLogin.isLogged)
    .select("team email permissions")
    .populate("team");

  const serialized_data = JSON.parse(JSON.stringify(data));
  return { props: { data: serialized_data } };
}

export default Team;
