import { apiWrapper } from "../utils/apiUtils";

const GetAPI = async (url, dispatch) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        //Authorization: `Basic ${credentials}`, // Attach Basic Auth
        //"Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get ${uri}`);
    }

    return { data: response, error: "", status: response.status };
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

    return { data: null, error: error.message, status: 500 };
  }
};

const CreateAPI = async (formData, uri, dispatch) => {
  const response = await apiWrapper({
    body: JSON.stringify(formData),
    dispatch,
    endpoint: `/${uri}`,
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

export {
  GetAPI,
  CreateAPI,
  UpdateAPI,
};
