import classes from "../login.module.scss";
import Image from "next/image";
import Head from "next/head";
import { Button, TextField, Typography, colors } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSnackbar } from "notistack";
import { forget_password } from "../../../services/pages/auth";
import { useState } from "react";
import Router from "next/router";
import jwt from "jsonwebtoken";

import { showSnackBar } from "../../../next-utils/helper_functions";
const { promisify } = require("util");

const ForgetPassword = (props) => {
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onSubmit = async (e) => {
    setLoading(true);
    closeSnackbar();
    const results = await forget_password({ email });
    if (results.status === "success")
      showSnackBar(enqueueSnackbar, results.message, "success");
    setLoading(false);
    if (results.status === "failed") {
      showSnackBar(enqueueSnackbar, results.message, "error");
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Forget your account password</title>
        <meta
          name="Forget your account password"
          content="Forget your account password? Don't worry we got you back"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={classes["Container"]}>
        <div className={classes["Container__Left"]}>
          <Image
            src="/assets/password-update-background.jpg"
            alt="Illustration of team work"
            fill
          />
        </div>
        <div className={classes["Container__Right"]}>
          <form className={classes["Form"]}>
            <Typography
              variant="h4"
              component={"h5"}
              style={{ color: "var(--color-font-black)" }}
              className={classes["Form__Heading"]}
            >
              Forget your password
            </Typography>
            <Typography
              variant="body1"
              component={"p"}
              style={{ color: "var(--color-font-grey)" }}
              className={classes["Form__SubHeading"]}
            >
              {props.error ||
                `Forget your password? Don't worry just give us your account email.`}
            </Typography>

            <TextField
              id="Email"
              label="Email"
              variant="outlined"
              placeholder="Enter your email"
              fullWidth
              size="small"
              type="email"
              className={classes["Form__TextBox"]}
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
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
                Submit
              </Typography>
            </LoadingButton>

            <Typography
              variant="body1"
              component={"p"}
              style={{ color: "var(--color-font-grey)" }}
              className={classes["Form__otherText"]}
            >
              Remember your password now?
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
              Don't have an account yet:{" "}
              <span
                onClick={() => {
                  Router.push("/auth/signup");
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
  if (validId.id)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  // CHECKS IF THE USER IS LOGGED IN
}

export default ForgetPassword;
