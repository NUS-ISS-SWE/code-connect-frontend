import { apiWrapper } from "../utils/apiUtils";
import { fetchToken, LOGIN_TOKEN_KEY } from "../utils/authUtils";
import { GetAPI } from "./GeneralAPI";

const PATHNAME = "/api/v1/employee-profiles";

const retrieveEmployeeProfile = async (dispatch) => {
  return await GetAPI(`${PATHNAME}`, dispatch);
};

const retrieveEmployeeProfilePicture = async (dispatch) => {
  return await GetAPI(`${PATHNAME}-picture`, dispatch);
};

const updateEmployeeProfile = async (formData, dispatch) => {
  const response = await apiWrapper({
    body: JSON.stringify(formData),
    dispatch,
    endpoint: `${PATHNAME}`,
    method: "PUT",
  });

  return response;
};

const uploadEmployeeProfilePicture = async (file, dispatch) => {
  dispatch({ type: "LOADING", payload: { isOpen: true } });

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${PATHNAME}-picture`, {
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

export {
  retrieveEmployeeProfile,
  retrieveEmployeeProfilePicture,
  updateEmployeeProfile,
  uploadEmployeeProfilePicture,
};
