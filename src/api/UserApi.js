import { apiWrapper } from "../utils/apiUtils";

const loginUser = async ({ username, password, role }, dispatch) => {
  const requestBody = JSON.stringify({ username, password, role });

  const response = await apiWrapper({
    body: requestBody,
    dispatch,
    endpoint: `/api/v1/login`,
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  return response;
};

const registerUser = async (formData, dispatch) => {
  const response = await apiWrapper({
    body: JSON.stringify(formData),
    dispatch,
    endpoint: `/api/v1/register`,
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  return response;
};

const updatePassword = async (
  { username, password, newPassword },
  dispatch
) => {
  const requestBody = JSON.stringify({
    username,
    password,
    newPassword,
  });

  const response = await apiWrapper({
    body: requestBody,
    dispatch,
    endpoint: `/api/v1/update-password`,
    method: "POST",
  });

  return response;
};

export { loginUser, registerUser, updatePassword };
