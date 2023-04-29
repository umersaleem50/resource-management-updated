import { request_function_test } from "../request_function";

export const get_one_service = async (token, id) =>
  await request_function_test({
    url: `/service/${id}`,
    method: "GET",
    token,
  });

export const edit_service_request = async (data, id) =>
  await request_function_test({
    url: `/service/${id}`,
    method: "PATCH",
    data,
  });
