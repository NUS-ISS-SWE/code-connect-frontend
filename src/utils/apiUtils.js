/* eslint-disable no-undef */
import {
  fetchToken,
  LOGIN_TOKEN_KEY,
  removeToken,
} from "../contexts/AuthContext.jsx";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const apiWrapper = async ({
  altError,
  body,
  dispatch,
  endpoint,
  headers,
  method,
  signal,
}) => {
  dispatch({ type: "SET_LOADING", payload: { isOpen: true } });

  try {
    const response = await fetch(`${endpoint}`, {
      method,
      headers: headers || {
        Authorization: `Bearer ${fetchToken(LOGIN_TOKEN_KEY)}`,
      },
      body,
      signal,
    });

    const jsonData = await response.json();

    if (!response.ok) {
      throw jsonData;
    }

    return { data: jsonData, error: "", status: response.status };
  } catch (err) {
    console.error(`ERROR ${err.message || err.statusText}`);

    if (err?.message?.includes("Token is expired")) {
      removeToken(LOGIN_TOKEN_KEY);
    }

    const errorMessage = `${
      err?.message ||
      err.statusText ||
      altError ||
      "Unable to complete request. Please try again."
    }`;

    dispatch({
      type: "SHOW_TOAST",
      payload: {
        message: String(errorMessage),
        isOpen: true,
        variant: "error",
      },
    });

    return { data: err, error: errorMessage, status: err.status };
  } finally {
    dispatch({ type: "SET_LOADING", payload: { isOpen: false } });
  }
};

export { apiWrapper, baseUrl };
