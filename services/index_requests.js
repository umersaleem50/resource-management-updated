import axios from "axios";

const HOSTNAME = `http://localhost:${3000}/api/v1`;
/**
 * Function to send request to api routes
 * @param {String} url End point of the api
 * @param {String} method Method of the Route
 * @param  {...any} data Object of the data
 * @returns Return valid response on success otherwise return Error Object
 */

const request_function = async ({ url, method, data, token = null }) => {
  try {
    const results = await axios({
      url: HOSTNAME + url,
      method,
      data,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (results) return results.data;
  } catch (error) {
    // RETURN API ERROR
    if (error.response) return error.response.data;
    // IF IT'S NOT API ERROR IT WILL LOG AND SEND THE ERROR OBJECT

    return error;
  }
};

export const get_profile_request = (token) =>
  request_function({
    url: `/profile`,
    method: "GET",
    token,
  });

export const get_note_request = (token) =>
  request_function({ url: "/note", method: "GET", token });
