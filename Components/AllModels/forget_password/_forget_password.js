import Router from "next/router";
import { useRef } from "react";
import { TextInputLabel } from "../../Input/TextInput/TextInput";
import { BtnFull, TextButton } from "../../Input/Buttons/Button";
import classes from "./_forget_password.module.scss";
import { HEADING_2, Paragraph } from "../../Typography/Typography";
import axios from "axios";
import { showNofication } from "../../stateless/Notification/Notification";
import Link from "next/link";

const Forget_Password_Form = (props) => {
  const emailRef = useRef();
  const passRef = useRef();

  const submitRequest = async (url) => {
    const email = emailRef.current.value;
    try {
      const request = await axios({
        url,
        data: { email },
        method: "POST",
      });

      showNofication(`Reset token sent, Please check your mail.`, "success");
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
        await submitRequest("/api/auth/forget-password");
      }}
    >
      <HEADING_2>Forget Password</HEADING_2>
      <div className={classes["Container"]}>
        <Paragraph color="var(--color-blue)">
          You will receive an mail to reset your <br></br> password.
        </Paragraph>
        <TextInputLabel
          htmlFor="name"
          label="Name"
          placeHolder="Enter your email or phone"
          type="email"
          ref={emailRef}
        />
        <BtnFull className={[classes["Btn--login"]]} text="submit" />

        <TextButton className={classes["Btn--forget"]}>
          I remember now! <Link href={"/auth/login"}>Login</Link>
        </TextButton>
      </div>
    </form>
  );
};

export default Forget_Password_Form;
