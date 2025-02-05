/* eslint-disable no-undef */
import {
  fetchToken,
  LOGIN_TOKEN_KEY,
  removeToken,
} from "../contexts/AuthContext.jsx";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const apiWrapper = async ({
  altError,
  baseUrl,
  body,
  dispatch,
  endpoint,
  headers,
  method,
  signal,
}) => {
  dispatch({ type: "SET_LOADING", payload: { isOpen: true } });

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
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

    return jsonData;
  } catch (err) {
    console.error(`ERROR ${err.message || err.msg}`);

    if (
      err?.message?.includes("Token is expired") ||
      err?.message?.includes("token contains an invalid number of segments")
    ) {
      removeToken(LOGIN_TOKEN_KEY);
    }

    const errorMessage = `${
      err?.message ||
      err.msg ||
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

    return err;
  } finally {
    dispatch({ type: "SET_LOADING", payload: { isOpen: false } });
  }
};

export { apiWrapper, baseUrl };
