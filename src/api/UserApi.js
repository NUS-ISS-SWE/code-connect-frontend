import { apiWrapper } from "../utils/apiUtils";

const loginUser = async ({ username, password }, dispatch) => {
  const credentials = btoa(`${username}:${password}`); // Encode in Base64

  try {
    const response = await fetch(`/api/v1/login`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${credentials}`, // Attach Basic Auth
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    // const jsonData = await response.json();

    // Dummy token for now
    const dummyToken = "123";

    return { data: { token: dummyToken }, error: "", status: response.status };
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
    return { data: {}, error: error, status: {} };
  }
};

const registerUser = async ({ username, password }, dispatch) => {
  const formData = JSON.stringify({ username, password });

  const response = await apiWrapper({
    body: formData,
    dispatch,
    endpoint: `/api/v1/register`,
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  return response;
};

export { loginUser, registerUser };
