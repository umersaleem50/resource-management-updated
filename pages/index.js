import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import classes from "./index.module.scss";
import MainContainer from "../Components/stateless/MainContainer/MainContainer";
import Notes from "../Components/stateless/Notes/Notes";
import Tasks from "../Components/stateful/Tasks/Tasks";
import Reports from "../Components/stateful/Reports/Reports";
import {
  protected_route_next,
  useJWTToken,
} from "../next-utils/login_validation";

import { useSnackbar } from "notistack";
import { get_profile_request } from "../services/pages/index_requests";
import Welcome_Screen from "../Components/stateless/Welcome_Screen/Welcome_Screen";

export default function Home(props) {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <div className={styles.container}>
      <Head>
        <title>Homepage</title>
        <meta name="description" content="Welcome to resource manangement" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <Navbar
        data={{
          profilePicture:
            "/storage/profilePicture/Sadeem 2-972393.1975688296-1671391613915-profilePicture.jpeg",
        }}
      /> */}
      <MainContainer navbar>
        <main className={classes.Main_Container}>
          <div className={classes.Main_Container__Left}>
            <Notes />
          </div>
          <div className={classes.Main_Container__Right}>
            <Welcome_Screen firstName={props.data.firstName} />
            <Tasks
              setSendModelToggle
              userId={props.data.id}
              snackBar={enqueueSnackbar}
            />
            {/* <Reports snackBar={enqueueSnackbar} /> */}
          </div>
        </main>
      </MainContainer>

      <footer className={styles.footer}>this is a footer in index.js</footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  // const isLoggedIn = login_validation(context.req);
  const { token } = useJWTToken(context);
  try {
    await protected_route_next(context);
    const user_data = await get_profile_request(token);

    return {
      props: {
        data: user_data,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
}
