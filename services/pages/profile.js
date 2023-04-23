import { request_function } from "../request_function";

export const update_profile_request = async (data, id = null, token = null) =>
  await request_function({
    url: `/profile${id ? "/" + id : ""}`,
    method: "PATCH",
    data,
    token,
  });

export const assign_task_request = async (data, id = null, token = null) => {
  return await request_function({
    url: `/tasks/${id}`,
    method: "POST",
    data,
  });
};
