import { request_function, request_function_test } from "../request_function";

export const get_team_request = (token = null) =>
  request_function({
    url: "/profile?fields=team,permissions",
    method: "GET",
    token,
  });

export const post_create_sub_account = (data, token = null) => {
  return request_function_test({
    url: "/auth/sub-account",
    method: "POST",
    data,
    token,
  });
};
