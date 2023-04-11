import classes from "./login.module.scss";
import Image from "next/image";
import Head from "next/head";
import { Button, TextField, Typography, colors } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSnackbar } from "notistack";
import { use_Login_validation } from "../../next-utils/login_validation";
import { login_callback } from "../../services/request_function";
import { useState } from "react";
import Router from "next/router";
import jwt from "jsonwebtoken";
const { promisify } = require("util");

const Login = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const showSnackBar = (message, variant = "success") => {
    return enqueueSnackbar(<Typography>{message}</Typography>, {
      variant,
    });
  };

  const onSubmit = async (e) => {
    setLoading(true);
    closeSnackbar();
    const results = await login_callback({ email, password });
    if (results.status === "success")
      showSnackBar("Welcome back! You have successfully logged in", "success");
    setLoading(false);
    if (results.status === "failed") {
      showSnackBar(results.message, "error");
      setLoading(false);
    }
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
          <form className={classes["Form"]}>
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
              onClick={onSubmit}
              loading={isLoading}
              loadingPosition="start"
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
              ]}
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
              <span
                onClick={() => {
                  enqueueSnackbar("Forget", { variant: "warning" });
                }}
              >
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
  const cookie = context && context?.req?.cookies?.jwt;
  if (!cookie) {
    return { props: {} };
  }
  const validId = await promisify(jwt.verify)(
    cookie,
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
