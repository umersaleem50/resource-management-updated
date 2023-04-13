import { request_function } from "../request_function";

export const get_team_request = (token = null) =>
  request_function({ url: "/profile/team", method: "GET", token });
