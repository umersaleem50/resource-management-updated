// import axios from "axios";
import {
  protected_route_next,
  useJWTToken,
} from "../../next-utils/login_validation";
import { get_team_request } from "../../services/pages/team";
import MainContainer from "../../Components/stateless/MainContainer/MainContainer";

import { useState } from "react";

const Team = (props) => {
  return (
    <MainContainer navbar title="Resource Management - My Team">
      WORKING TEAM
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
        data: requestObj,
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
