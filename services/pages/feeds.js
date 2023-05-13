import { request_function_test } from "../request_function";

export const send_new_post_request = async (data) =>
  request_function_test({ url: "/posts", method: "POST", data });

export const fetch_one_post_data = async (id) =>
  request_function_test({ url: `/posts/${id}`, method: "GET" });

export const delete_comment_request = async (id) =>
  request_function_test({ url: `/comments/${id}`, method: "DELETE" });

export const post_new_comment = async (post_id, comment) =>
  request_function_test({
    url: `/comments/${post_id}`,
    method: "POST",
    data: { comment },
  });
