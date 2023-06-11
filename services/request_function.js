import axios from "axios";

const HOSTNAME = process.env.API_ROUTE || `http://localhost:${5566}/api/v1`;
/**
 * Function to send request to api routes
 * @param {String} url End point of the api
 * @param {String} method Method of the Route
 * @param  {...any} data Object of the data
 * @param {String} token valid jwt token
 * @returns Return valid response on success otherwise return Error Object
 */

// export const request_function = async ({ url, method, data }) => {
//   try {
//     const results = await axios({ url: HOSTNAME + url, method, data });
//     if (results) return results.data;
//   } catch (error) {
//     // RETURN API ERROR
//     if (error.response) return error.response.data;
//     // IF IT'S NOT API ERROR IT WILL LOG AND SEND THE ERROR OBJECT
//     return error;
//   }
// };

export const request_function = async ({ url, method, data, token = null }) => {
  try {
    // const results = await axios({
    //   url: HOSTNAME + url,
    //   method,
    //   data,
    //   headers: { Authorization: `Bearer ${token}` },
    // });

    console.log(data);

    // const response = await fetch(url, {
    //   method: "POST", // *GET, POST, PUT, DELETE, etc.
    //   mode: "cors", // no-cors, *cors, same-origin
    //   credentials: "include", // include, *same-origin, omit

    //   referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //   body: JSON.stringify(data), // body data type must match "Content-Type" header
    // });

    const results = await axios({
      url,
      method,
      data,
      // method: "POST", // *GET, POST, PUT, DELETE, etc.
      // mode: "cors", // no-cors, *cors, same-origin
      // credentials: "include", // include, *same-origin, omit
      // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });

    console.log(results);

    // const results = await response.json();
    if (results) return results.data;
  } catch (error) {
    // RETURN API ERROR
    if (error.response) return error.response.data;
    // IF IT'S NOT API ERROR IT WILL LOG AND SEND THE ERROR OBJECT
    return error;
  }
};

export const request_function_test = ({
  url,
  method,
  data,
  token = null,
  params = {},
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const results = await axios({
        url: HOSTNAME + url,
        method,
        data,
        // withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "multipart/form-data",
        },
        params,
      });

      if (results) resolve(results.data.data);
    } catch (error) {
      // RETURN API ERROR
      if (error.response) reject(error.response.data);
      // IF IT'S NOT API ERROR IT WILL LOG AND SEND THE ERROR OBJECT
      reject(error);
    }
  });
};

// export const login_callback = (data) =>
//   request_function({ url: "/auth/login", method: "POST", data });

// export const signup_callback = (data) =>
//   request_function({ url: "/auth/signup", method: "POST", data });

// export const reset_password = (data, token) =>
//   request_function({
//     url: `/auth/reset-password/${token}`,
//     method: "POST",
//     data,
//   });

// export const forget_password = async (data) =>
//   request_function({
//     url: `/auth/forget-password`,
//     method: "POST",
//     data,
//   });

// export const logout_callback = async () =>
//   request_function({ url: "/profile/logout", method: "POST" });

// export const all_reports_callback = async () =>
//   request_function({ url: "/reports", method: "GET" });
