import { prepareFormDataForCreateAndEditJob } from "../utils/apiUtils";
import { GetAPI, PostAPI } from "./GeneralAPI";

const PATHNAME = "jobpostings";

const createJob = async (formData, dispatch) => {
  const requestBody = prepareFormDataForCreateAndEditJob(formData);
  return await PostAPI(requestBody, `/${PATHNAME}`, dispatch);
};

const retrieveJob = async (id, dispatch) => {
  return await GetAPI(`/${PATHNAME}/${id}`, dispatch);
};

const retrieveJobListings = async (dispatch) => {
  return await GetAPI(`/${PATHNAME}`, dispatch);
};

export { createJob, retrieveJob, retrieveJobListings };
