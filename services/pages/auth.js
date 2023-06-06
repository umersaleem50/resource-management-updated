import { request_function, request_function_test } from "../request_function";

export const login_callback = (data) =>
  request_function_test({ url: "/auth/login", method: "POST", data });

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

export const logout_callback = async () =>
  request_function_test({ url: "/profile/logout", method: "POST" });
