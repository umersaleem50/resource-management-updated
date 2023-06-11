import { signIn, useSession, getSession, signOut } from "next-auth/react";
import Navbar from "../Components/stateful/Navbar/Navbar";
const Test = ({ session }) => {
  const clientSession = useSession();
  console.log(clientSession);
  return (
    <>
      <Navbar></Navbar>
      <p>This is test page</p>
      {session?.user ? <p>{session.user.firstName}</p> : <p>Please login</p>}
      <button onClick={() => signIn()}>signin</button>
      <button onClick={() => signOut()}>sign out</button>
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    // Redirect the user to the login page if not authenticated
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
export default Test;
