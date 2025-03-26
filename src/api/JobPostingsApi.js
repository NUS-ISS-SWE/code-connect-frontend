import { GetAPI } from "./GeneralAPI";

const PATHNAME = "jobpostings";

const retrieveJob = async (id, dispatch) => {
  return await GetAPI(`/${PATHNAME}/${id}`, dispatch);
};

const retrieveJobListings = async (dispatch) => {
  return await GetAPI(`/${PATHNAME}`, dispatch);
};

export { retrieveJob, retrieveJobListings };
