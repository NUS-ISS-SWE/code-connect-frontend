/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import EditJob from "../components/jobPageComponents/EditJob";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ViewJob from "../components/jobPageComponents/ViewJob";

import { retrieveJob } from "../api/JobPostingsApi";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGlobalContext } from "../hooks/useGlobalContext";

const JobPage = () => {
  const { state, dispatch } = useGlobalContext();
  const { setUser, user } = useAuthContext();

  const { jobId } = useParams(); // Get profile ID from URL
  const fieldRefs = {
    jobTitle: useRef(null),
  };

  const [date, setDate] = useState(new Date());
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchJob = async () => {
    const { data, status } = await retrieveJob(jobId, dispatch);

    if (status === 200) {
      setFormData(data);
      setUser({ ...user, ...data });
    }
  };

  useEffect(() => {
    if (!jobId) {
      // If no ID is provided, show an empty form for creating a profile
      setFormData({});
      setLoading(false);
      return;
    }

    fetchJob();
  }, [jobId]); // Runs when the ID changes



  //Account for thumbnail and numberApplied for viewing?

  return (
    <Stack className="bg-gray-white flex flex-1 items-start justify-start min-h-[100vh] w-full">
      <Navbar />
      <Stack className="flex flex-1 items-start justify-start mx-auto max-w-3xl py-8 space-y-2 w-[70vw]">
      <Typography variant="h4" className="text-left">
      {jobId ? "View Job" : "Create Job"}
        </Typography>
        <Divider flexItem />
        <Typography variant="h6" className="text-left">
          <b>{formData?.jobTitle}</b>
        </Typography>
        <Typography variant="h8" className="text-left">
          <b>Created on: </b>
          {formData?.postedDate
            ? new Date(formData.postedDate).toLocaleDateString()
            : date.toLocaleDateString()}
        </Typography>
        <Divider flexItem />
        {jobId ? (
          <ViewJob jobData={formData} />
        ) : (
          <EditJob
            formData={formData}
            fieldRefs={fieldRefs}
            setFormData={setFormData}
            setLoading={setLoading}
            dispatch={dispatch}
          />
        )}
      </Stack>
      <Footer />
    </Stack>
  );
};

export default JobPage;
