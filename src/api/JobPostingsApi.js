import { GetAPI, PostAPI, DeleteAPI } from "./GeneralAPI";

import {
  prepareFormDataForCreateAndEditJob,
  unpackRetrieveJobData,
} from "../utils/apiUtils";

const PATHNAME = "jobpostings";

const createJob = async (formData, dispatch) => {
  const requestBody = prepareFormDataForCreateAndEditJob(formData);
  const { data, ...rest } = await PostAPI(
    requestBody,
    `/${PATHNAME}`,
    dispatch
  );

  const processedData = unpackRetrieveJobData(data);
  return { data: processedData, ...rest };
};

const retrieveJob = async (id, dispatch) => {
  const { data, ...rest } = await GetAPI(`/${PATHNAME}/${id}`, dispatch);

  const processedData = unpackRetrieveJobData(data);
  return { data: processedData, ...rest };
};

const retrieveJobListings = async (dispatch) => {
  return await GetAPI(`/${PATHNAME}`, dispatch);
};

const deleteJobListing = async (id, dispatch) => {
  return await DeleteAPI(`/${PATHNAME}/${id}`, dispatch);
};

export { createJob, retrieveJob, retrieveJobListings, deleteJobListing };
