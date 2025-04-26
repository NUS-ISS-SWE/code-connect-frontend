import { fetchToken, removeToken, LOGIN_TOKEN_KEY } from "./authUtils.js";
import { extractSalaryRange } from "./stringUtils.js";

// Append VITE_API_BASE_URL only in production.
// const baseUrl = import.meta.env.PROD ? import.meta.env.VITE_API_BASE_URL : "";

const apiWrapper = async ({
  altError,
  body,
  dispatch,
  endpoint,
  headers,
  method,
  signal,
}) => {
  dispatch({ type: "LOADING", payload: { isOpen: true } });

  try {
    const response = await fetch(`${endpoint}`, {
      method,
      headers: headers ?? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${fetchToken(LOGIN_TOKEN_KEY).token}`,
      },
      body,
      signal,
    });

    if (!response.ok) {
      throw response;
    }

    let jsonData;
    // Error boundary for non-json response
    try {
      jsonData = response.status == 204 ? response : await response.json();
    } catch (err) {
      console.log(err);
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
    dispatch({ type: "LOADING", payload: { isOpen: false } });
  }
};

const prepareFormDataForCreateAndEditJob = (data) => {
  const { salaryRangeMin, salaryRangeMax, ...processedData } = data;

  const postedDate = data["postedDate"] ?? new Date().toISOString();
  processedData["postedDate"] = postedDate;

  // Concat salary ranges into single string
  processedData["salaryRange"] = `$${salaryRangeMin ?? 0}-$${
    salaryRangeMax ?? Infinity
  }`;

  return processedData;
};

const unpackRetrieveJobData = (data) => {
  const processedData = { ...data };

  // Include salary min and max values
  const [salaryRangeMin, salaryRangeMax] = extractSalaryRange(
    data?.salaryRange
  );
  processedData["salaryRangeMin"] = salaryRangeMin;
  processedData["salaryRangeMax"] = salaryRangeMax;

  return processedData;
};

const prepareFormDataForCreateAndEditJobApplication = (data) => {
  const { ...processedData } = data;

  processedData["applicationDate"] =
    data["applicationDate"] ?? new Date().toISOString();
  processedData["applicantName"] = `${data["firstName"]} ${data["lastName"]}`;
  processedData["applicantEmail"] = data["email"];

  return processedData;
};

export {
  apiWrapper,
  baseUrl,
  prepareFormDataForCreateAndEditJob,
  unpackRetrieveJobData,
  prepareFormDataForCreateAndEditJobApplication,
};
