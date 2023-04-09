import axios from "axios";

const HOSTNAME = `http://localhost:${3000}/api/v1`;
/**
 * Function to send request to api routes
 * @param {String} url End point of the api
 * @param {String} method Method of the Route
 * @param  {...any} data Object of the data
 * @returns Return valid response on success otherwise return Error Object
 */

const request_function = async ({ url, method, data }) => {
  console.log(data);
  try {
    const results = await axios({ url: HOSTNAME + url, method, data });
    if (results) return results.data;
  } catch (error) {
    // RETURN API ERROR
    if (error.response) return error.response.data;
    // IF IT'S NOT API ERROR IT WILL LOG AND SEND THE ERROR OBJECT
    console.log(error);
    return error;
  }
};

export const login_callback = (data) =>
  request_function({ url: "/auth/login", method: "POST", data });

export const signup_callback = (data) =>
  request_function({ url: "/auth/signup", method: "POST", data });

export const reset_password = (data, token) =>
  request_function({
    url: `/auth/reset-password/${token}`,
    method: "POST",
    data,
  });

export const forget_password = async (data) =>
  request_function({
    url: `/auth/forget-password`,
    method: "POST",
    data,
  });
