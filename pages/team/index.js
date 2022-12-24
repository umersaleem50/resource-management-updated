// import axios from "axios";
import classes from "./Team.module.scss";
import axios from "axios";
import MainContainer from "../../Components/stateless/MainContainer/MainContainer";
import Section from "../../Components/stateless/Section/Section";
import {
  Heading_Large,
  Heading_Tiny,
  Paragraph,
} from "../../Components/Typography/Typography";
import Account from "../../Components/stateless/Account/Account";
import { BtnFull } from "../../Components/Input/Buttons/Button";
import Model from "../../Components/stateless/Model/Model";
import {
  SelectInput,
  TextInputLabel,
} from "../../Components/Input/TextInput/TextInput";
import { useRef, useState } from "react";
import Router from "next/router";
import Notification, {
  showNofication,
} from "../../Components/stateless/Notification/Notification";

let setShowModel;

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

const sendSignupRequest = async (
  firstName,
  lastName,
  category,
  email,
  password,
  id = null
) => {
  const result = await axios({
    url: `/api/auth/signup/${id}`,
    method: "post",
    data: {
      firstName,
      lastName,
      category,
      email,
      password,
      passwordConfirm: password,
      professions: ["can-post"],
      profession: "painter",
    },
  });

  return result;
};

const SignupModel = (props) => {
  const categoryRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  return (
    <form
      className={classes.Signup}
      onSubmit={async (e) => {
        e.preventDefault();
        let category = categoryRef.current.textContent;
        let firstname = firstNameRef.current.value;
        let lastname = lastNameRef.current.value;
        let email = emailRef.current.value;
        let password = passwordRef.current.value;
        try {
          const result = await sendSignupRequest(
            firstname,
            lastname,
            category,
            email,
            password,
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
        ></SelectInput>
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

        <BtnFull style={{ marginTop: "1rem" }} width="full">
          Submit
        </BtnFull>
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
            otherData={{ id: props.data.id, setShowModel }}
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
      url: `${protocol}://${context.req.headers.host}/api/profile/`,

      params: {
        select: "team,email,id,permissions",
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
