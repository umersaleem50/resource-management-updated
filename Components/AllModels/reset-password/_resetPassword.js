import Router from "next/router";
import classes from "./_resetPassword.module.scss";
import { HEADING_2, Paragraph } from "../../Typography/Typography";
import { BtnFull } from "../../Input/Buttons/Button";
import { TextInputLabel } from "../../Input/TextInput/TextInput";
import { useRef } from "react";
import axios from "axios";
import { showNofication } from "../../stateless/Notification/Notification";
const Reset_Password = (props) => {
  const passRef = useRef();
  const passConfirmRef = useRef();

  const submitRequest = async (url) => {
    const password = passRef.current.value;
    const passwordConfirm = passConfirmRef.current.value;
    try {
      const results = await axios({
        url,
        data: { password, passwordConfirm },
        method: "POST",
        timeout: 10000,
      });
      console.log("this is results _resetpassword", results);
      showNofication(results.data.message, results.data.status, () =>
        Router.replace("/auth/login")
      );
    } catch (error) {
      console.log(error);
      showNofication(
        error?.response?.data?.message ||
          "something went wrong. Try again later",
        "error"
      );
    }
  };

  return (
    <form
      className={classes["Form"]}
      onSubmit={async (e) => {
        e.preventDefault();
        await submitRequest(`/api/auth/reset-password/${props.token}`);
      }}
    >
      <HEADING_2>Reset Password</HEADING_2>
      {props.error && (
        <div className={classes["Container"]}>
          <Paragraph color="var(--color-error)">{props.error}</Paragraph>

          <BtnFull
            className={[classes["Btn--login"]]}
            text="go back to login page"
            clicked={(e) => {
              e.preventDefault();
              Router.replace("/auth/login");
            }}
          />
        </div>
      )}
      {!props.error && (
        <div className={classes["Container"]}>
          <TextInputLabel
            htmlFor="password"
            label="password"
            placeHolder="Enter a new password"
            type="password"
            ref={passRef}
          />
          <TextInputLabel
            htmlFor="passwordconfirm"
            label="Password Confirm"
            placeHolder="Confirm your password"
            type="password"
            ref={passConfirmRef}
          />

          <BtnFull className={[classes["Btn--login"]]} text="Change password" />
          <Paragraph className={classes["Paragraph--or"]}>
            Or, you can go back safely.
          </Paragraph>
          <BtnFull
            className={[classes["Btn--goback"]]}
            clicked={(e) => {
              e.preventDefault();
              Router.replace("/auth/login");
            }}
          >
            Go page to login page
          </BtnFull>
        </div>
      )}
    </form>
  );
};

export default Reset_Password;
