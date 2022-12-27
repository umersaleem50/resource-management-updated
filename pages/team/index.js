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
import Model from "../../Components/stateless/Model/Model";
import {
  MultiSelect,
  SelectInput,
  TextInputLabel,
} from "../../Components/Input/TextInput/TextInput";
import { useRef, useState } from "react";
import Router from "next/router";
import Notification, {
  showNofication,
} from "../../Components/stateless/Notification/Notification";
import profession from "../../Dev-Data/professions";

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
                member={el.team.length}
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

const sendSignupRequest = async (requestObj, id) => {
  const result = await axios({
    url: `/api/auth/signup/${id}`,
    method: "post",

    data: { ...requestObj, passwordConfirm: requestObj.password },
  });

  return result;
};

const SignupModel = (props) => {
  const categoryRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const permissionRef = useRef();
  const professionRef = useRef();
  return (
    <form
      className={classes.Signup}
      onSubmit={async (e) => {
        e.preventDefault();
        let category = categoryRef.current.textContent;
        let firstName = firstNameRef.current.value;
        let lastName = lastNameRef.current.value;
        let email = emailRef.current.value;
        let password = passwordRef.current.value;
        let permissions = permissionRef.current.textContent.split(",");
        let profession = [];
        profession[0] = professionRef.current.textContent;
        try {
          const result = await sendSignupRequest(
            {
              firstName,
              lastName,
              category,
              email,
              password,
              permissions,
              profession,
            },
            props.otherData.id
          );
          if (result) {
            props.otherData.setShowModel(false);
            showNofication(
              "Account created successfully. Automatically reloading page.",
              "success",
              () => Router.reload()
            );
          }
        } catch (error) {
          console.log(error.response);
          showNofication(error.response.data.message, "error");
        }
      }}
    >
      <Heading_Large>Create a sub account</Heading_Large>
      <div className={classes.Signup__Container}>
        <SelectInput
          label="Select a category"
          category={props.category}
          ref={categoryRef}
          add
        ></SelectInput>
        <SelectInput
          category={profession}
          label="Choose profession"
          ref={professionRef}
        ></SelectInput>
        <MultiSelect
          category={props.otherData.permissions}
          label={"Select permissions"}
          ref={permissionRef}
          // title={"Choose the permissions"}
        ></MultiSelect>

        <TextInputLabel
          label="First Name"
          type="text"
          required
          htmlFor="firstname"
          placeHolder="Type Firstname"
          ref={firstNameRef}
        ></TextInputLabel>
        <TextInputLabel
          label="Last Name"
          ref={lastNameRef}
          type="text"
          required
          htmlFor="lastname"
          placeHolder="Type Lastname"
        ></TextInputLabel>
        <TextInputLabel
          label="Email"
          ref={emailRef}
          type="email"
          required
          htmlFor="email"
          placeHolder="Enter the email"
        ></TextInputLabel>
        <TextInputLabel
          ref={passwordRef}
          label="Password"
          type="password"
          htmlFor="password"
          placeHolder="Enter the password"
          minLength="8"
        ></TextInputLabel>

        <BtnFull width="full">Submit</BtnFull>
      </div>
    </form>
  );
};

const Team = (props) => {
  let [showModel, setShowModel] = useState(false);

  const showModelPropsFunction = (type) => {
    setShowModel(type);
  };
  // console.log(props);
  //   const categories = props.team.map((el, i) => el.category);
  //   console.log(categories);
  const branches = createBranches(props.data.team);

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
          <Heading_Tiny>My Team : {props.data.email} </Heading_Tiny>
          {props.data.permissions &&
            props.data.permissions.includes("have-team") && (
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

export async function getServerSideProps(context) {
  let team;
  const protocol = context.req.secure ? "https" : "http";
  try {
    team = await axios({
      //   url: "http://localhost:3000/api/profile/",
      // url: `/api/profile/`,
      url: `${protocol}://${context.req.headers.host}/api/profile/`,

      params: {
        select: "team,email,id,permissions",
        populate:
          "coverPicture,profession,firstName,lastName,team,email,category,profilePicture,id",
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
