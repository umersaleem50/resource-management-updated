import { request_function } from "../request_function";

export const get_profile_request = (token) =>
  request_function({
    url: `/profile`,
    method: "GET",
    token,
  });

export const get_note_request = (token) =>
  request_function({ url: "/note", method: "GET", token });

export const all_reports_callback = async () =>
  request_function({ url: "/reports", method: "GET" });

export const logout_callback = async () =>
  request_function({ url: "/profile/logout", method: "POST" });
