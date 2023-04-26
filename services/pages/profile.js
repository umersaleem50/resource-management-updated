import { request_function, request_function_test } from "../request_function";

export const update_profile_request = async (data, id = null, token = null) =>
  await request_function_test({
    url: `/profile${id ? "/" + id : ""}`,
    method: "PATCH",
    data,
    token,
  });

export const assign_task_request = async (data, id = null, token = null) => {
  return await request_function_test({
    url: `/tasks/${id}`,
    method: "POST",
    data,
  });
};

export const update_password_request = async (data, id = null, token = null) =>
  await request_function_test({
    url: `/auth/update-password${id ? "/" + id : ""}`,
    method: "POST",
    data,
    token,
  });

export const request_upload_gallery = async (data, id = "") =>
  await request_function_test({
    url: `/profile/${id}`,
    method: "PATCH",
    data,
  });
