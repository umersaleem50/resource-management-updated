import Head from "next/head";

import Image from "next/image";
import classes from "./login.module.scss";
import axios from "axios";
import { useRef } from "react";
import Notification, {
  showNofication,
} from "../../Components/stateless/Notification/Notification";
import MainContainer from "../../Components/stateless/MainContainer/MainContainer";
import Router from "next/router";
import jwt from "jsonwebtoken";
import Login_Form from "../../Components/AllModels/login/_login";
import { verify_already_login } from "../../next-utils/login_validation";
import { Alert } from "@mui/material";
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

    showNofication(`Login successful, You're redirecting!`, "success", () =>
      Router.replace("/team")
    );
  } catch (error) {
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
      <Head>
        <title>Login with your account</title>
        <meta
          name="Login"
          content="Login with your account to continue using the application."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Notification type="success" />
      <Alert variant="filled" severity="error" color="error" closeText="close">
        This is a test error
      </Alert>
      <div className={classes["container"]}>
        <Login_Form />
      </div>
      <div className={classes["container__image"]}>
        <Image
          fill="cover"
          src="/assets/login-background.jpg"
          objectFit="cover"
        />
      </div>
    </MainContainer>
  );
};

export async function getServerSideProps(context) {
  return verify_already_login(context, "/");
}

export default Login;
