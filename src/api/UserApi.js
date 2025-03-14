import { apiWrapper, baseUrl } from "../utils/apiUtils";

const loginUser = async ({ username, password, role }, dispatch) => {
  const formData = JSON.stringify({ username, password, role });

  const response = await apiWrapper({
    body: formData,
    dispatch,
    endpoint: `${baseUrl}/api/v1/login`,
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
console.log('login response',response)
  return response;
};

const registerUser = async ({ username, password, role }, dispatch) => {
  const formData = JSON.stringify({ username, password, role });

  const response = await apiWrapper({
    body: formData,
    dispatch,
    endpoint: `${baseUrl}/api/v1/register`,
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  return response;
};

export { loginUser, registerUser };
