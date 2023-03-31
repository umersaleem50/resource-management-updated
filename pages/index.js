import Head from "next/head";
import styles from "../styles/Home.module.css";
const Member = require("../Express-api/Models/member");
import classes from "./index.module.scss";
import MainContainer from "../Components/stateless/MainContainer/MainContainer";
import Notification from "../Components/stateless/Notification/Notification";
import Notes from "../Components/stateless/Notes/Notes";
import { login_validation } from "../next-utils/login_validation";
import DashboardProfile from "../Components/stateful/DashboardProfile/DashboardProfile";
import Tasks from "../Components/stateful/Tasks/Tasks";
import Reports from "../Components/stateful/Reports/Reports";

export default function Home(props) {
  // const [isSendModelToggle, setSendModelToggle] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainContainer navbar>
        <Notification type="success" />
        {/* {isSendModelToggle && (
          <Model toggleModel={setSendModelToggle}>
            <SendReportModel />
          </Model>
        )} */}
        <main className={classes.Main_Container}>
          <div className={classes.Main_Container__Left}>
            <Notes />
          </div>
          <div className={classes.Main_Container__Right}>
            {/* <DashboardProfile profile={props.data}></DashboardProfile> */}

            <Tasks setSendModelToggle userId={props.data.id} />
            <Reports />
          </div>
        </main>
      </MainContainer>

      <footer className={styles.footer}>this is a footer in index.js</footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const isLoggedIn = login_validation(context.req);

  if (!isLoggedIn.isLogged) {
    return isLoggedIn.redirect;
  }

  try {
    const id = isLoggedIn.isLogged;

    const profileData = await Member.findById(id).populate({
      path: "otherDetails",
    });
    // .select(
    //   "otherDetails firstName lastName fullName profilePicture profession"
    // );
    // if (!profileData)
    //   return {
    //     redirect: {
    //       permanent: false,
    //       destination: "/404",
    //     },
    //   };

    return {
      props: {
        data: JSON.parse(JSON.stringify(profileData)),
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }
}

// SAVE IT FOR THE LATER
// export async function getServerSideProps({ req }) {
//   const protocol = req.headers['x-forwarded-proto'] || 'http';
//   const host = req.headers['x-forwarded-host'] || req.headers.host;
//   const baseUrl = `${protocol}://${host}`;

//   const res = await fetch(`${baseUrl}/api/data`);
//   const data = await res.json();

//   return {
//     props: {
//       data,
//     },
//   };
// }
