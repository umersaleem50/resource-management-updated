import Notification, {
  showNofication,
} from "../../../Components/stateless/Notification/Notification";
import Head from "next/head";
import Image from "next/image";
import classes from "./Forget.module.scss";

import MainContainer from "../../../Components/stateless/MainContainer/MainContainer";
import Signup_Form from "../../../Components/AllModels/signup/_signup";
import { verify_already_login } from "../../../next-utils/login_validation";
import Forget_Password_Form from "../../../Components/AllModels/forget_password/_forget_password";
const Forget_Password = (props) => {
  return (
    <MainContainer navbar title="Resource Management - Login">
      <Head>
        <title>Forget your password | Just provide us your email</title>
        <meta
          name="Forget Password"
          content="Forget password of your account? Just provide us you email."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Notification type="success" />
      <div className={classes["container"]}>
        <Forget_Password_Form />
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
  return verify_already_login(context);
}

export default Forget_Password;
