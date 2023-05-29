import classes from "./login.module.scss";
import Image from "next/image";
import Head from "next/head";
import { Button, TextField, Typography, colors } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSnackbar } from "notistack";
import { login_callback } from "../../services/pages/auth";
import { useState } from "react";
import Router from "next/router";
import jwt from "jsonwebtoken";
import { useJWTToken } from "../../next-utils/login_validation";
import { useEffect } from "react";
import axios from "axios";
const { promisify } = require("util");

const Login = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const showSnackBar = (message, variant = "success") => {
    return enqueueSnackbar(<Typography>{message}</Typography>, {
      variant,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    closeSnackbar();

    const results = await login_callback({ email, password }, false);

    if (results.status === "success")
      showSnackBar("Login Successfully! You're redirecting...", "success");
    Router.push("/team");
    setLoading(false);

    if (results.status === "failed") {
      showSnackBar(results.message, "error");
      return setLoading(false);
    }
    showSnackBar("Something went wrong, Try again later...", "error");
    return setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Login to continue</title>
        <meta
          name="Login"
          content="Login with your account to continue using the application."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={classes["Container"]}>
        <div className={classes["Container__Left"]}>
          <Image
            src="/assets/login-background.jpg"
            alt="Illustration of team work"
            fill
          />
        </div>
        <div className={classes["Container__Right"]}>
          <form className={classes["Form"]} onSubmit={onSubmit}>
            <Typography
              variant="h3"
              component={"h4"}
              style={{ color: "var(--color-font-black)" }}
              className={classes["Form__Heading"]}
            >
              Welcome back!
            </Typography>
            <Typography
              variant="body1"
              component={"body1"}
              style={{ color: "var(--color-font-grey)" }}
              className={classes["Form__SubHeading"]}
            >
              Login to website, to continue discovering a world full of
              resources
            </Typography>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              size="small"
              type="email"
              placeholder="Enter your email"
              fullWidth
              required
              className={classes["Form__TextBox"]}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              placeholder="Password"
              fullWidth
              size="small"
              type="password"
              className={classes["Form__TextBox"]}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <LoadingButton
              variant="contained"
              fullWidth
              size="large"
              className={classes["Form__Button"]}
              loading={isLoading}
              // loadingPosition="start"
              type="submit"
            >
              <Typography
                // variant="button"

                style={{ color: "var(--color-white)" }}
              >
                Login
              </Typography>
            </LoadingButton>

            <Typography
              variant="body1"
              component={"body1"}
              style={{ color: "var(--color-font-grey)" }}
              className={classes["Form__otherText"]}
            >
              Don't have an account, Signup now for free
            </Typography>

            <Button
              variant="outlined"
              fullWidth
              size="large"
              className={[
                classes["Form__Button"],
                classes["Form__Button--signup"],
              ].join(" ")}
              onClick={() => Router.push("/auth/signup")}
            >
              <Typography
                // variant="button"
                style={{ color: "var(--color-blue)" }}
              >
                Signup
              </Typography>
            </Button>
            <Typography
              color={"var(--color-font-grey)"}
              className={classes["Form__forgetPassword"]}
            >
              Forget your password:{" "}
              <span onClick={() => Router.push("/auth/forget-password")}>
                Click here!
              </span>
            </Typography>
          </form>
        </div>
      </main>
    </>
  );
};

export async function getServerSideProps(context) {
  // const cookie = context && context?.req?.cookies?.jwt;
  const { token } = useJWTToken(context);
  if (!token) {
    return { props: {} };
  }
  const validId = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECERT_KEY
  );
  if (!validId.id)
    return {
      props: {},
    };

  return {
    redirect: {
      permanent: true,
      destination: "/",
    },
  };
}

export default Login;
