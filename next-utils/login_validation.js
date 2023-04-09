import { rejects } from "assert";
import { resolve } from "path";

const jwt = require("jsonwebtoken");
const { promisify } = require("util");

/**
 * validate the user before accessing a private route
 * @param {Object} context Context Object of getServerSideProps
 * @param {String} redirectUrl URL where user will redirect if not logged in
 * @returns Returns a valid data if user is loggedin .ie user:id
 */

export const use_Login_validation = async (context, redirect = true) => {
  const cookie = context && context?.req?.cookies.jwt;
  const validId = await promisify(jwt.verify)(
    cookie,
    process.env.JWT_SECERT_KEY
  );
  if (!validId || !validId.id)
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

export const protected_route_next = (context, redirect = false) =>
  new Promise(async (resolve, rejects) => {
    const errorMessage = `Invalid or Expired token, Please login again to claim new one.`;
    const cookie = context && context?.req?.cookies.jwt;

    if (!cookie) {
      return rejects(new Error(errorMessage));
    }

    try {
      const validId = await promisify(jwt.verify)(
        cookie,
        process.env.JWT_SECERT_KEY
      );

      if (!validId || !validId.id) {
        return rejects(new Error(errorMessage));
      }

      if (redirect) {
        return resolve({
          redirect: {
            destination: "/",
          },
        });
      }

      return resolve(validId.id);
    } catch (error) {
      return rejects(
        new Error(
          `Invalid or Expired token, Please login again to claim new one.`
        )
      );
    }
  });

// export const check_have_permission = (account_data, permission) => {
//   // const SELECTED_PERMISSON = permissions[1];

//   if (
//     account_data.permissions &&
//     account_data.permissions.includes(permission)
//   ) {
//     return { updateOwnAccount: true };
//   }
//   return { updateOwnAccount: false };
// };
// module.exports = { login_validation };
// export const verify_user_loggedin = (
//   context,
//   destination = "/",
//   defaultReturn = true
// ) => {
//   const token = context.req?.cookies?.jwt;

//   if (token && jwt.verify(token, process.env.JWT_SECERT_KEY)) {
//     return {
//       redirect: {
//         permanent: false,
//         destination,
//       },
//     };
//   }
//   if (defaultReturn) {
//     return { props: {} };
//   }
//   return null;
// };
