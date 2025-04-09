/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Stack, Tabs, Tab } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import EditJob from "../components/jobPageComponents/EditJob";
import ViewJob from "../components/jobPageComponents/ViewJob";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import paths from "../routes/paths";

import { retrieveJob } from "../api/JobPostingsApi";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGlobalContext } from "../hooks/useGlobalContext";

const JobPage = () => {
  const { state, dispatch } = useGlobalContext();
  const { jobDetails, loading } = state;
  let navigate = useNavigate();
  const [formData, setFormData] = useState(undefined);
  const fieldRefs = {
    jobTitle: useRef(null),
  };
  const { setUser, user } = useAuthContext();
  const { jobId } = useParams(); // Get job ID from URL
  const [tabIndex, setTabIndex] = useState(0); // <-- This tracks selected tab

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

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
              <Tabs value={tabIndex} onChange={handleTabChange}>
                <Tab label="View" />
                <Tab label="Edit" />
              </Tabs>
            </Stack>
          )}

          {jobId && tabIndex === 0 ? (
            <ViewJob jobDetails={jobDetails} />
          ) : (
            <EditJob
              formData={formData}
              fieldRefs={fieldRefs}
              setFormData={setFormData}
            />
          )}
        </Stack>
        <Footer />
      </Stack>
    )
  );
};

export default JobPage;
