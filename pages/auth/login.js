import Head from "next/head";
import {
  // BtnFull,
  Checkbox,
  // TextButton,
  TextInputLabel,
} from "../../Components/Input/TextInput/TextInput";
import { BtnFull, TextButton } from "../../Components/Input/Buttons/Button";
// import Navbar from "../../Components/stateful/Navbar/Navbar";
import ImageSlider from "../../Components/stateless/ImageSlider/ImageSlider";
import { Heading_Secondary } from "../../Components/Typography/Typography";
import classes from "./login.module.scss";
import axios from "axios";
import { useRef } from "react";
import Notification, {
  showNofication,
} from "../../Components/stateless/Notification/Notification";
import MainContainer from "../../Components/stateless/MainContainer/MainContainer";
import Router from "next/router";
import jwt from "jsonwebtoken";
// import Navbar from "../../Components/stateful/Navbar/Navbar";

const submitRequest = async (url, data) => {
  const email = data.emailRef.current.value;
  const password = data.passRef.current.value;
  try {
    const results = await axios({
      url,
      data: { email, password },
      method: "POST",
      timeout: 10000,
    });

    console.log("results", results.data);

    showNofication(`Login successful, You're redirecting!`, "success", () =>
      Router.replace("/team")
    );
  } catch (error) {
    console.log(error?.response?.data?.message);
    const errMessage =
      error?.response?.data?.message || "Something went wrong!,Error";
    showNofication(errMessage, "error");
  }
};

const Login = (props) => {
  const emailRef = useRef();
  const passRef = useRef();
  return (
    <MainContainer navbar title="Resource Management - Login">
      <div className={classes.container}>
        <Notification type="success" />
        <div className={classes.container__left}>
          <ImageSlider
            images={[
              "/assets/constructor1.jpg",
              "/assets/constructor2.jpg",
              "/assets/constructor3.jpg",
            ]}
          />
        </div>
        <div className={classes.container__right}>
          <div className={classes.login}>
            <Heading_Secondary>Login</Heading_Secondary>
            <div className={classes.login__container}>
              <TextInputLabel
                htmlFor="name"
                label="Name"
                placeHolder="Enter your email or phone"
                type="email"
                ref={emailRef}
              />
              <TextInputLabel
                htmlFor="password"
                label="Password"
                placeHolder="Enter your password"
                type="password"
                ref={passRef}
              />
              <Checkbox htmlFor="remember-me" label="Remember me" />
              <BtnFull
                style={{ margin: "3rem 0" }}
                width="full"
                text="Login"
                clicked={async () => {
                  await submitRequest("/api/auth/login", {
                    emailRef,
                    passRef,
                  });
                }}
              />
              <TextButton>
                Forget Something? <a href="/">Click here</a>
              </TextButton>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export async function getServerSideProps(context) {
  const token = context.req?.cookies?.jwt;

  if (token && jwt.verify(token, process.env.JWT_SECERT_KEY)) {
    return {
      redirect: {
        permanent: false,
        destination: "/team",
      },
    };
  }

  return { props: {} };
}

export default Login;
