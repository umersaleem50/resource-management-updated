import Router from "next/router";
import { useRef } from "react";
import { TextInputLabel } from "../../Input/TextInput/TextInput";
import { BtnFull, TextButton } from "../../Input/Buttons/Button";
import classes from "./_login.module.scss";
import { HEADING_2, Paragraph } from "../../Typography/Typography";
import axios from "axios";
import { showNofication } from "../../stateless/Notification/Notification";
import Link from "next/link";

const Login_Form = (props) => {
  const emailRef = useRef();
  const passRef = useRef();

  const submitRequest = async (url) => {
    const email = emailRef.current.value;
    const password = passRef.current.value;
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

  return (
    <form
      className={classes["Form"]}
      onSubmit={async (e) => {
        e.preventDefault();
        await submitRequest("/api/auth/login");
      }}
    >
      <HEADING_2>Login</HEADING_2>
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
        <BtnFull className={[classes["Btn--login"]]} text="Login" />
        <Paragraph className={classes["Paragraph--or"]}>Or</Paragraph>
        <BtnFull
          dark
          clicked={(e) => {
            e.preventDefault();
            showNofication("Service not available yet.", "error");
          }}
        >
          login with google account
        </BtnFull>
        <BtnFull
          dark
          clicked={(e) => {
            e.preventDefault();
            showNofication("Service not available yet.", "error");
          }}
        >
          login with apple account
        </BtnFull>
        <TextButton className={classes["Btn--forget"]}>
          Forget Something?{" "}
          <Link href={"/auth/forget-password"}>Click here</Link>
        </TextButton>
      </div>
    </form>
  );
};

export default Login_Form;
