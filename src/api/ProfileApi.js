import { GetAPI, PostAPI, UpdateAPI } from "./GeneralAPI";
import { apiWrapper } from "../utils/apiUtils";
import { fetchToken, LOGIN_TOKEN_KEY } from "../utils/authUtils";

const PATHNAME = "profiles";

const createProfile = async (formData, dispatch) => {
  return await PostAPI(formData, `/${PATHNAME}`, dispatch);
};

const updateProfile = async (formData, id, dispatch) => {
  return await UpdateAPI({ ...formData, id }, PATHNAME, dispatch);
};

const UploadProfilePicture = async (file, id, dispatch) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await apiWrapper({
      body: formData,
      dispatch,
      endpoint: `/${PATHNAME}/${id}/profilePicture`, // API endpoint for image upload
      headers: {},
      method: "POST",
    });

    return {
      data: response?.data?.profilePicture,
      error: "",
      status: response.status,
    };
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    return null;
  }
};

const DeleteResume = async ({ id }, dispatch) => {
  const response = await apiWrapper({
    dispatch,
    endpoint: `/${PATHNAME}/${id}/deleteResume`,
    method: "DELETE",
  });

  return response;
};

const retrieveUserProfile = async (id, dispatch) => {
  return await GetAPI(`/${PATHNAME}/${id}`, dispatch);
};

const UploadResumeAPI = async ({ id, formData }, dispatch) => {
  const response = await apiWrapper({
    body: formData,
    dispatch,
    endpoint: `/${PATHNAME}/${id}/uploadResume`,
    headers: {
      Authorization: `Bearer ${fetchToken(LOGIN_TOKEN_KEY).token}`,
    },
    method: "POST",
  });

  return response;
};

export {
  createProfile,
  DeleteResume,
  retrieveUserProfile,
  updateProfile,
  UploadResumeAPI,
  UploadProfilePicture,
};
