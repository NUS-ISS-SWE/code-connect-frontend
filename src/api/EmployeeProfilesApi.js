import { GetAPI, PostAPI, UpdateAPI } from "./GeneralAPI";

const PATHNAME = "/api/v1/employee-profiles";

const retrieveEmployeeProfile = async (dispatch) => {
  return await GetAPI(`${PATHNAME}`, dispatch);
};

export { retrieveEmployeeProfile };
