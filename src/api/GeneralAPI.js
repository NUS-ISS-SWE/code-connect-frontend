import { apiWrapper } from "../utils/apiUtils";

const GetAPI = async (url, dispatch) => {
  const response = await apiWrapper({
    dispatch,
    endpoint: `${url}`,
    method: "GET",
  });
  return response;
};

const PostAPI = async (formData, uri, dispatch) => {
  const response = await apiWrapper({
    body: JSON.stringify(formData),
    dispatch,
    endpoint: `${uri}`,
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  return response;
};

const UpdateAPI = async (formData, uri, dispatch) => {
  const response = await apiWrapper({
    body: JSON.stringify(formData),
    dispatch,
    endpoint: `/${uri}/${formData.id}`, // Update specific profile by ID
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT", // Use PUT instead of POST for updates
  });

  return response;
};

const DeleteAPI = async (uri, dispatch) => {
  const response = await apiWrapper({
    dispatch,
    endpoint: uri,
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
    });

  return response;
}


export { GetAPI, PostAPI, UpdateAPI, DeleteAPI };