import { GetAPI, PostAPI } from "./GeneralAPI";
import { apiWrapper } from "../utils/apiUtils";
import { fetchToken, LOGIN_TOKEN_KEY } from "../utils/authUtils";

const PATHNAME = "profiles";

const createProfile = async (formData, dispatch) => {
  return await PostAPI(formData, `/${PATHNAME}`, dispatch);
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

const RetrieveResume = async ({ id, fileName }, dispatch) => {
  try {
    const response = await fetch(`/${PATHNAME}/${id}/resume`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const blob = await response.blob();
    const file = new File([blob], fileName || "Resume.pdf", {
      type: "application/pdf",
    });
    const fileUrl = URL.createObjectURL(file);

    return { data: { file, fileUrl }, error: "", status: response.status };
  } catch (error) {
    console.error("Error:", error);

    dispatch({
      type: "SHOW_TOAST",
      payload: {
        message: String(error),
        isOpen: true,
        variant: "error",
      },
    });

    return { data: null, error: error, status: {} };
  }
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
  RetrieveResume,
  retrieveUserProfile,
  UploadResumeAPI,
  UploadProfilePicture,
};
