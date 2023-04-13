import { request_function } from "../request_function";

export const get_profile_request = (token) =>
  request_function({
    url: `/profile`,
    method: "GET",
    token,
  });

export const get_note_request = (token) =>
  request_function({ url: "/notes", method: "GET", token });

export const all_reports_callback = async () =>
  request_function({ url: "/reports", method: "GET" });

export const all_tasks_callback = async () =>
  request_function({ url: "/tasks", method: "GET" });

export const logout_callback = async () =>
  request_function({ url: "/profile/logout", method: "POST" });
