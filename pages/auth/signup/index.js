import classes from "./Signup.module.scss";
import Image from "next/image";
import Head from "next/head";
import { Button, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSnackbar } from "notistack";
import { useState } from "react";
import Router from "next/router";
import { signup_callback } from "../../../services/pages/auth";
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
// import { IconButton } from "@mui/icons-material";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showSnackBar = (message, variant = "success") => {
    const messageArr =
      (message.includes(",") && message?.split(",")) || message;
    if (typeof messageArr === Array && messageArr.length)
      messageArr.map((msg, _) => {
        if (msg === "") return;
        return enqueueSnackbar(<Typography>{msg.trim()}</Typography>, {
          variant,
        });
      });
    else {
      enqueueSnackbar(<Typography>{message}</Typography>, {
        variant,
      });
    }
  };

  const onSubmit = async (e) => {
    setLoading(true);
    const results = await signup_callback({ email, password, passwordConfirm });
    if (results.status === "success") {
      closeSnackbar();
      showSnackBar("You account have been successfully created.", "success");
      Router.push("/");
      return;
    }
    if (results.status === "failed" || "error") {
      showSnackBar(results.message, "error");
      setLoading(false);
      return;
    }
  };

  return (
    <>
      <Head>
        <title>Signup now!</title>
        <meta
          name="Create an account"
          content="Create an account free & discover the world of resources."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={classes["Container"]}>
        <div className={classes["Container__Left"]}>
          <Image
            src="/assets/signup-background.jpg"
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
              Signup for free
            </Typography>
            <Typography
              variant="body1"
              component={"p"}
              style={{ color: "var(--color-font-grey)" }}
              className={classes["Form__SubHeading"]}
            >
              Signup for free to continue using the application, and manage your
              project with your team mates
            </Typography>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              size="small"
              type="email"
              required
              placeholder="Enter a valid email"
              fullWidth
              className={classes["Form__TextBox"]}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              placeholder="Choose a strong password"
              fullWidth
              size="small"
              type="password"
              className={classes["Form__TextBox"]}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              id="confirm-password"
              label="Confirm Password"
              variant="outlined"
              placeholder="Type your password again"
              fullWidth
              size="small"
              type="password"
              className={classes["Form__TextBox"]}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <LoadingButton
              variant="contained"
              fullWidth
              size="large"
              className={classes["Form__Button"]}
              onClick={onSubmit}
              loading={isLoading}
            >
              <Typography
                // variant="button"
                style={{ color: "var(--color-white)" }}
              >
                Create an account
              </Typography>
            </LoadingButton>

            <Typography
              variant="body1"
              component={"p"}
              style={{ color: "var(--color-font-grey)" }}
              className={classes["Form__otherText"]}
            >
              Alread have an account?
            </Typography>

            <Button
              variant="outlined"
              fullWidth
              size="large"
              className={[
                classes["Form__Button"],
                classes["Form__Button--signup"],
              ].join(" ")}
              onClick={() => Router.push("/auth/login")}
            >
              <Typography
                // variant="button"
                style={{ color: "var(--color-blue)" }}
              >
                Login
              </Typography>
            </Button>
            <Typography
              color={"var(--color-font-grey)"}
              className={classes["Form__forgetPassword"]}
            >
              Forget your password:{" "}
              <span
                onClick={() => {
                  Router.push("/auth/forget-password");
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

export default Signup;
