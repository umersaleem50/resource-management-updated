import Notification from "../../../Components/stateless/Notification/Notification";
import Head from "next/head";
import Image from "next/image";
import classes from "./Reset-password.module.scss";
import MainContainer from "../../../Components/stateless/MainContainer/MainContainer";
import { verify_already_login } from "../../../next-utils/login_validation";
import { Paragraph } from "../../../Components/Typography/Typography";
import { useEffect } from "react";
import crypto from "crypto";
import Member from "../../../Express-api/Models/member";
import { BtnFull } from "../../../Components/Input/Buttons/Button";
import Reset_Password from "../../../Components/AllModels/reset-password/_resetPassword";
const Forget_Password = (props) => {
  return (
    <MainContainer navbar title="Resource Management - Login">
      <Head>
        <title>Reset your token | Just provide us your email</title>
        <meta
          name="Forget Password"
          content="Forget password of your account? Just provide us you email."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Notification type="success" />
      <div className={classes["container"]}>
        {/* <Reset_Password_Form /> */}
        <Reset_Password error={props.error} token={props.token} />
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
  const redirectObj = verify_already_login(context, "/", false);
  if (redirectObj) return redirectObj;
  const { token } = context.params;

  if (!token)
    return {
      props: { error: "Please check your mail you will receive a token." },
    };

  const decryptToken = crypto.createHash("sha256").update(token).digest("hex");
  console.log("decrypt token token.js:51", decryptToken);
  const member = await Member.findOne({
    passwordResetToken: decryptToken,
  }).select("+passwordResetToken +passwordResetExpire");

  if (!member) {
    return {
      props: { error: "Invalid reset token, Please check your mail again." },
    };
  }

  if (
    !member.passwordResetToken ||
    (member.passwordResetExpire &&
      member.passwordResetExpire.getTime() < Date.now())
  ) {
    return { props: { error: "Reset token expired." } };
  }

  return { props: { token } };
}

export default Forget_Password;
