import { apiWrapper } from "../utils/apiUtils";

const activateEmployerAccount = async (data, dispatch) => {
  const response = await apiWrapper({
    body: JSON.stringify(data),
    dispatch,
    endpoint: `/api/v1/review-employer-profiles`,
    method: "POST",
  });

  return response;
};

const retrieveAllEmployees = async (dispatch) => {
  const response = await apiWrapper({
    dispatch,
    endpoint: `/api/v1/list-employee-profiles`,
    method: "GET",
  });

  return response;
};

const retrieveAllEmployers = async (dispatch) => {
  const response = await apiWrapper({
    dispatch,
    endpoint: `/api/v1/list-employer-profiles`,
    method: "GET",
  });

  return response;
};

export { activateEmployerAccount, retrieveAllEmployees, retrieveAllEmployers };
