import { apiWrapper } from "../utils/apiUtils";
import { fetchToken, LOGIN_TOKEN_KEY } from "../utils/authUtils";
import { GetAPI } from "./GeneralAPI";

const PATHNAME = "/api/v1/employee";

const activateEmployeeAccount = async (token, dispatch) => {
  const response = await apiWrapper({
    dispatch,
    endpoint: `api/v1/activate?token=${token}`,
    method: "GET",
  });

  return response;
};

const deleteEmployeeResume = async (dispatch) => {
  const response = await apiWrapper({
    dispatch,
    endpoint: `${PATHNAME}-resume`,
    method: "DELETE",
  });

  return response;
};

const retrieveEmployeeProfile = async (dispatch) => {
  return await GetAPI(`${PATHNAME}-profiles`, dispatch);
};

const retrieveEmployeeProfilePicture = async (dispatch) => {
  return await GetAPI(`${PATHNAME}-profiles-picture`, dispatch);
};

const retrieveEmployeeResume = async (dispatch) => {
  const { data, ...rest } = await GetAPI(`${PATHNAME}-resume`, dispatch);

  // Convert base64 encoded pdf to blob
  const byteCharacters = atob(data.resumeContent);
  const byteNumbers = new Array(byteCharacters.length)
    .fill(0)
    .map((_, i) => byteCharacters.charCodeAt(i));
  const byteArray = new Uint8Array(byteNumbers);

  const blob = new Blob([byteArray], { type: "application/pdf" });
  const resumeUrl = URL.createObjectURL(blob);

  const processedData = { resumeUrl, ...data };

  return { data: processedData, ...rest };
};

const updateEmployeeProfile = async (formData, dispatch) => {
  const response = await apiWrapper({
    body: JSON.stringify(formData),
    dispatch,
    endpoint: `${PATHNAME}-profiles`,
    method: "PUT",
  });

  return response;
};

const uploadEmployeeProfilePicture = async (file, dispatch) => {
  dispatch({ type: "LOADING", payload: { isOpen: true } });

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${PATHNAME}-profiles-picture`, {
      body: formData,
      headers: {
        Authorization: `Bearer ${fetchToken(LOGIN_TOKEN_KEY).token}`,
      },
      method: "POST",
    });

    if (!response.ok) {
      throw response;
    }
    const result = await response.text();
    return {
      data: result,
      error: "",
      status: response.status,
    };
  } catch (err) {
    console.error(`ERROR ${err.statusText}`);

    dispatch({
      type: "SHOW_TOAST",
      payload: {
        message: String(err.statusText),
        isOpen: true,
        variant: "error",
      },
    });

    return { data: err, error: err.statusText, status: err.status };
  } finally {
    dispatch({ type: "LOADING", payload: { isOpen: false } });
  }
};

const uploadEmployeeResume = async (file, dispatch) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiWrapper({
    body: formData,
    dispatch,
    endpoint: `${PATHNAME}-resume`,
    headers: {
      Authorization: `Bearer ${fetchToken(LOGIN_TOKEN_KEY).token}`,
    },
    method: "POST",
  });

  return response;
};

export {
  activateEmployeeAccount,
  deleteEmployeeResume,
  retrieveEmployeeProfile,
  retrieveEmployeeProfilePicture,
  retrieveEmployeeResume,
  updateEmployeeProfile,
  uploadEmployeeProfilePicture,
  uploadEmployeeResume,
};
