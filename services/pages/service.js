import { request_function_test } from "../request_function";

export const get_one_service = async (token, id) =>
  await request_function_test({
    url: `/service/${id}`,
    method: "GET",
    token,
  });

export const service_request = async (data, id, method = "POST") =>
  await request_function_test({
    url: `/service/${id}`,
    method,
    data,
  });

export const delete_service_request = async (id) =>
  await request_function_test({
    url: `/service/${id}`,
    method: "DELETE",
  });
