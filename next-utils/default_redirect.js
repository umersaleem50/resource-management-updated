import { getSession } from "next-auth/react";
const default_redirect = async (context) => {
  const session = await getSession(context);

  if (!session)
    return {
      props: {},
    };

  return {
    redirect: {
      permanent: true,
      destination: "/",
    },
  };
};

export default default_redirect;
