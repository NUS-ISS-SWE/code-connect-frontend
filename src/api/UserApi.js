import { apiWrapper, baseUrl } from "../utils/apiUtils";

const loginUser = async ({ email, password }, dispatch) => {
  const formData = JSON.stringify({ email, password });

  const response = await apiWrapper({
    altError: "",
    baseUrl,
    body: formData,
    dispatch,
    endpoint: `/user/action/login`,
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  return response;
};

export { loginUser };
