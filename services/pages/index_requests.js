import { request_function } from "../request_function";

export const get_profile_request = async (token, id = null, fields = null) => {
  let queryFields = null;
  if (fields) {
    queryFields = `?fields=${fields.join(",")}`;
  }
  return await request_function({
    url: `/profile${id ? "/" + id : ""}${fields ? queryFields : ""}`,
    method: "GET",
    token,
  });
};

export const get_other_profile_request = async (token, id) =>
  await request_function({
    url: `/profile/other/${id}`,
    method: "GET",
    token,
  });

export const get_note_request = async (token) =>
  await request_function({ url: "/notes", method: "GET", token });

export const all_reports_callback = async () =>
  await request_function({ url: "/reports", method: "GET" });

export const all_tasks_callback = async () =>
  await request_function({ url: "/tasks", method: "GET" });

export const post_create_note_callback = async (data) =>
  await request_function({ url: "/notes", method: "POST", data });

export const delete_note_request = async (id) =>
  await request_function({ url: `/notes/${id}`, method: "DELETE" });
