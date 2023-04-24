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

/**
 *  Use this hook to get the token, if the user is logged in
 * @param {Object} context Context object of the getServerSideProp
 * @returns return jwt token if user is logged in
 */

export const useJWTToken = (context) => {
  const token = context.req && context.req?.cookies?.jwt;
  if (token) {
    return { token };
  }
  return { token: "" };
};
