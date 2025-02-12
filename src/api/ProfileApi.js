import { apiWrapper } from "../utils/apiUtils";

const API_BASE_URL = "http://localhost:8080/profiles";

const getProfileById = async ({id}, dispatch) => {
  try {
    const url = `${API_BASE_URL}/${id}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        //Authorization: `Basic ${credentials}`, // Attach Basic Auth
        //"Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get profile");
    }

    return { data: response, error: "", status: response.status };
  } catch (error) {
    console.error("Error:", error);

    dispatch({
      type: "SHOW_TOAST",
      payload: {
        message: error,
        isOpen: true,
        variant: "error",
      },
    });

    return { data: null, error: error.message, status: 500 };
  }
};
const createProfile = async ({fullName, jobTitle, currentCompany, location, email, phone, aboutMe, programmingLanguages, education, experience }, dispatch) => {
  const formData = JSON.stringify({
    fullName,
    jobTitle,
    currentCompany,
    location,
    email,
    phone,
    aboutMe,
    programmingLanguages,
    education,
    experience,
  });

  const url = `${API_BASE_URL}`;

  console.log("code reaches here");
  const response = await apiWrapper({
    body: formData,
    dispatch,
    endpoint: url, // Update specific profile by ID
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST", // Use PUT instead of POST for updates
  });

  return response;
};

const updateProfile = async ({ id, fullName, jobTitle, currentCompany, location, email, phone, aboutMe, programmingLanguages, education, experience }, dispatch) => {
  const formData = JSON.stringify({
    fullName,
    jobTitle,
    currentCompany,
    location,
    email,
    phone,
    aboutMe,
    programmingLanguages,
    education,
    experience,
  });

  const url = `${API_BASE_URL}/${id}`;

  const response = await apiWrapper({
    body: formData,
    dispatch,
    endpoint: url, // Update specific profile by ID
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT", // Use PUT instead of POST for updates
  });

  return response;
};

export { getProfileById, updateProfile, createProfile };
