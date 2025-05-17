import { GetAPI, PostAPI, DeleteAPI } from "./GeneralAPI";
import { prepareFormDataForCreateAndEditJobApplication } from "../utils/apiUtils";
const PATHNAME = "jobapplications";

const createJobApplication = async (jobId, formData, dispatch) => {
  const processedFormData =
    prepareFormDataForCreateAndEditJobApplication(formData);
  const { data, ...rest } = await PostAPI(
    processedFormData,
    `/${PATHNAME}/${jobId}`,
    dispatch
  );
  return { data, ...rest };
};

const retrieveJobApplication = async (id, dispatch) => {
  const { data, ...rest } = await GetAPI(`/${PATHNAME}/${id}`, dispatch);
  return { data, ...rest };
};

const retrieveJobApplications = async (dispatch) => {
  return await GetAPI(`/${PATHNAME}`, dispatch);
};

// TODO: Filter for user ID instead of email
const retrieveJobApplicationsByUser = async (userEmail, dispatch) => {
  const { data } = await retrieveJobApplications(dispatch);
  return data.filter((item) => item.applicantEmail === userEmail);
};

const deleteJobApplication = async (id, dispatch) => {
  return await DeleteAPI(`/${PATHNAME}/${id}`, dispatch);
};

export {
  createJobApplication,
  retrieveJobApplication,
  retrieveJobApplications,
  deleteJobApplication,
  retrieveJobApplicationsByUser,
};
