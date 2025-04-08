/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Divider, Stack, Typography, Box} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import EditJob from "../components/jobPageComponents/EditJob";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Tabs from "../components/common/Tabs";
import paths from "../routes/paths";

import { retrieveJob } from "../api/JobPostingsApi";
import Icon from "../constants/Icon";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { JOB_DETAILS_TAB_OPTIONS } from "../utils/tabOptionsUtils";

const JobPage = () => {
  const { state, dispatch } = useGlobalContext();
  const { jobDetails, loading } = state;
  let navigate = useNavigate();
  const [formData, setFormData] = useState(undefined);

  const { setUser, user } = useAuthContext();
  const { jobId } = useParams(); // Get job ID from URL

  useEffect(() => {
    if (!jobId) {
      // If no ID is provided, show an empty form for creating a profile
      setFormData({});
    } else if (!jobDetails || jobDetails?.id !== Number(jobId)) {
      fetchJob();
    } else {
      setFormData(jobDetails);
    }
  }, [jobDetails, jobId]); // Runs when the ID changes


  const fetchJob = async () => {
    const { data, status } = await retrieveJob(jobId, dispatch);

    if (status === 200) {
      setFormData(data);
      setUser({ ...user, ...data });
      dispatch({
        type: "JOB_DETAILS",
        payload: data,
      });
    } else {
      navigate(paths.get("HOME").PATH);
    }
  };

  //Account for thumbnail and numberApplied for viewing?

  return (
    jobDetails && (
      <Stack className="bg-gray-white flex flex-1 items-start justify-start min-h-[100vh] w-full">
        <Navbar />
        <Stack className="flex flex-1 items-start justify-start mx-auto max-w-3xl py-8 space-y-2 w-[95vw] lg:w-[70vw]">
          {/* Tabs !!!TODO: Only Admin and listing owner can view tab */}
          {user && jobId && (
            <Stack className="!border-b !border-gray-300 !border-solid w-[100%]">
              <Tabs tabOptions={JOB_DETAILS_TAB_OPTIONS(jobId)} />
            </Stack>
          )}

          <Stack className="px-3 py-2 space-y-1">
            <Typography className="!font-semibold text-left !text-3xl">
              {jobId ? jobDetails?.jobTitle : "Create Job"}
            </Typography>

            <Box className="flex items-center justify-start space-x-1">
              <Typography className="!font-medium !text-gray-900 !text-xs">
                {`Created on: ${new Date(
                  jobDetails?.postedDate
                ).toLocaleDateString()}`}
              </Typography>

              <Icon name={"Dot"} size={"1em"} />

              <Typography className="!font-medium !text-gray-900 !text-xs">
                {`Last edited: ${new Date(
                  jobDetails?.postedDate
                ).toLocaleDateString()}`}
              </Typography>
            </Box>
          </Stack>

          <Divider flexItem />

          <EditJob
            formData={jobDetails}
            //fieldRefs={fieldRefs}
            //setFormData={setFormData}
          />
        </Stack>
        <Footer />
      </Stack>
    )
  );
};

export default JobPage;
