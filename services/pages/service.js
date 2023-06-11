import { useSession } from "next-auth/react";
import { request_function_test } from "../request_function";

export const get_one_service = async (token, id) =>
  await request_function_test({
    url: `/service/${id}`,
    method: "GET",
    token,
  });

export const service_request = async (data, id, method = "POST") => {
  const session = useSession();
  return await request_function_test({
    url: `/service/${method !== "POST" ? id : ""}`,
    method,
    data,
    token: session.token,
  });
};

export const delete_service_request = async (id) =>
  await request_function_test({
    url: `/service/${id}`,
    method: "DELETE",
  });

export const fetch_latest_services = async (search) =>
  await request_function_test({
    url: `/service`,
    method: "GET",
    data: {},
    token: null,
    params: {
      fields: `heading,description,type,provider,coverPicture`,
      ...search,
    },
  });
