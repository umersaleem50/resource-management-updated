import Router from "next/router";
import { useRef } from "react";
import { TextInputLabel } from "../../Input/TextInput/TextInput";
import { BtnFull, TextButton } from "../../Input/Buttons/Button";
import classes from "./_signup.module.scss";
import { HEADING_2, Paragraph } from "../../Typography/Typography";
import axios from "axios";
import { showNofication } from "../../stateless/Notification/Notification";
import Link from "next/link";

const Signup_Form = (props) => {
  const emailRef = useRef();
  const passRef = useRef();
  const passConfirmRef = useRef();

  const submitRequest = async (url) => {
    const email = emailRef.current.value;
    const password = passRef.current.value;
    const passwordConfirm = passConfirmRef.current.value;
    try {
      const results = await axios({
        url,
        data: { email, password, passwordConfirm },
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

  return (
    <form
      className={classes["Form"]}
      onSubmit={async (e) => {
        e.preventDefault();
        await submitRequest("/api/auth/signup");
      }}
    >
      <HEADING_2>Sign up</HEADING_2>
      <div className={classes["Container"]}>
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
        <TextInputLabel
          htmlFor="password-confirm"
          label="Password Confirm"
          placeHolder="Confirm your password"
          type="password"
          ref={passConfirmRef}
        />
        <BtnFull className={[classes["Btn--login"]]} text="sign up" />
        <Paragraph className={classes["Paragraph--or"]}>Or</Paragraph>
        <BtnFull dark>login with google account</BtnFull>
        <BtnFull dark>login with apple account</BtnFull>
        <TextButton className={classes["Btn--forget"]}>
          Already have an account? <Link href={"/auth/login"}>Login</Link>
        </TextButton>
      </div>
    </form>
  );
};

export default Signup_Form;
