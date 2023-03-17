import Notification, {
  showNofication,
} from "../../../Components/stateless/Notification/Notification";
import Head from "next/head";
import Image from "next/image";
import classes from "./Signup.module.scss";

import MainContainer from "../../../Components/stateless/MainContainer/MainContainer";
import Signup_Form from "../../../Components/AllModels/signup/_signup";
import { verify_already_login } from "../../../next-utils/login_validation";
const Signup = (props) => {
  return (
    <MainContainer navbar title="Resource Management - Login">
      <Head>
        <title>Signup | register a new account.</title>
        <meta
          name="Login"
          content="Login with your account to continue using the application."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Notification type="success" />
      <div className={classes["container"]}>
        <Signup_Form />
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

export default Signup;
