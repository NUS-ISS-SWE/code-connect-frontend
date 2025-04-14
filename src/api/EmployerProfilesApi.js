import { GetAPI, PostAPI, UpdateAPI } from "./GeneralAPI";

const PATHNAME = "/api/v1/employer-profiles";

const retrieveEmployerProfile = async (dispatch) => {
  return await GetAPI(`${PATHNAME}`, dispatch);
};

export { retrieveEmployerProfile };
