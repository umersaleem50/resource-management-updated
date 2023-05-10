import { request_function_test } from "../request_function";

export const send_new_post_request = async (data) =>
  request_function_test({ url: "/posts", method: "POST", data });

export const fetch_one_post_data = async (id) =>
  request_function_test({ url: `/posts/${id}`, method: "GET" });
