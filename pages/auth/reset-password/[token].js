import classes from "../login.module.scss";
import Image from "next/image";
import Head from "next/head";
import { Button, TextField, Typography, colors } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSnackbar } from "notistack";
import { reset_password } from "../../../services/pages/auth";
import { useEffect, useState } from "react";
import Router from "next/router";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Member from "../../../Express-api/Models/member";
import { showSnackBar } from "../../../next-utils/helper_functions";
import default_redirect from "../../../next-utils/default_redirect";
import { getSession } from "next-auth/react";
const { promisify } = require("util");
const ResetPassword = (props) => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onSubmit = async (e) => {
    setLoading(true);
    closeSnackbar();
    const results = await reset_password(
      { password, passwordConfirm },
      props.token
    );
    console.log(results);
    if (results.status === "success")
      showSnackBar(enqueueSnackbar, results.message, "success");
    setLoading(false);
    if (results.status === "failed") {
      showSnackBar(enqueueSnackbar, results.message, "error");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (props.error) {
      showSnackBar(enqueueSnackbar, props.error, "error");
      setLoading(true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Update your account password</title>
        <meta
          name="Update your account password"
          content="Forget your password? Don't worry update your password now!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={classes["Container"]}>
        <div className={classes["Container__Left"]}>
          <Image
            src="/assets/resetpassword-background.jpg"
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
              Update your password
            </Typography>
            <Typography
              variant="body1"
              component={"p"}
              style={{
                color: props.error
                  ? "var(--color-error)"
                  : "var(--color-font-grey)",
              }}
              className={classes["Form__SubHeading"]}
            >
              {props.error ||
                `Forget your password? Don't worry update your password now!`}
            </Typography>

            <TextField
              id="newpassword"
              label="New Password"
              variant="outlined"
              placeholder="Enter a strong password"
              fullWidth
              size="small"
              type="password"
              className={classes["Form__TextBox"]}
              value={password}
              required
              disabled={props.error && true}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              id="confirmpassword"
              label="Confirm Password"
              variant="outlined"
              placeholder="Enter your password again"
              fullWidth
              size="small"
              type="password"
              className={classes["Form__TextBox"]}
              value={passwordConfirm}
              required
              disabled={props.error && true}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              helperText={`Password ${
                password == passwordConfirm ? "" : "not"
              } matched!`}
            />

            <LoadingButton
              variant="contained"
              fullWidth
              size="large"
              className={classes["Form__Button"]}
              onClick={onSubmit}
              loading={isLoading}
              type="submit"
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
  const session = await getSession(context);
  if (session || session?.token_detail?.exp > Date.now())
    return {
      redirect: {
        permanent: true,
        destination: "/test",
      },
    };
  //--------------
  const { token } = context.params;

  if (!token)
    return {
      props: {
        error: "Please check your mail you may received a reset token.",
      },
    };

  const decryptToken = crypto.createHash("sha256").update(token).digest("hex");

  try {
    const member = await Member.findOne({
      passwordResetToken: decryptToken,
    }).select("+passwordResetToken +passwordResetExpire");

    if (!member) {
      return {
        props: { error: "Invalid reset token, Please check your mail again." },
      };
    }
  } catch (error) {
    return {
      props: { error: "Invalid reset token, Please check your mail again." },
    };
  }

  if (
    !member.passwordResetToken ||
    (member.passwordResetExpire &&
      member.passwordResetExpire.getTime() < Date.now())
  ) {
    return {
      props: {
        error: "Your reset token is expired. You can request a new one.",
      },
    };
  }

  return { props: { token } };
}

export default ResetPassword;
