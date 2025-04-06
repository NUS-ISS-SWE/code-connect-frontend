import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { intervalToDuration } from "date-fns";
import { Link, useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Tabs from "../components/common/Tabs";

import { retrieveJob } from "../api/JobPostingsApi";
import dummyThumbnail from "../assets/dummy/dummy_icon_1.png";
import Icon from "../constants/Icon";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGlobalContext } from "../hooks/useGlobalContext";
import paths from "../routes/paths";
import { renderIntervalDuration } from "../utils/stringUtils";
import { JOB_DETAILS_TAB_OPTIONS } from "../utils/tabOptionsUtils";

const JobDetailsPage = () => {
  const { state, dispatch } = useGlobalContext();
  const { jobDetails, loading } = state;

  const { user } = useAuthContext();
  let navigate = useNavigate();
  const { jobId } = useParams();

  useEffect(() => {
    if (!jobDetails || jobDetails?.id !== Number(jobId)) {
      fetchJob();
    }
  }, [jobDetails, jobId]);

  const fetchJob = async () => {
    const { data, status } = await retrieveJob(jobId, dispatch);

    if (status === 200) {
      dispatch({
        type: "JOB_DETAILS",
        payload: data,
      });
    } else {
      navigate(paths.get("HOME").PATH);
    }
  };

  return (
    <Stack className="bg-gray-white flex flex-1 items-start justify-start min-h-[100vh] w-full">
      <Navbar />

      <Stack className="flex flex-1 items-start justify-start mx-auto max-w-3xl py-8 space-y-6 w-[95vw] lg:w-[70vw]">
        {/* Tabs !!!TODO: Only Admin and listing owner can view tab */}
        {user && (
          <Stack className="!border-b !border-gray-300 !border-solid w-[100%]">
            <Tabs tabOptions={JOB_DETAILS_TAB_OPTIONS(jobId)} />
          </Stack>
        )}

        {/* Split Layout */}
        <Box className="flex flex-col lg:flex-row items-start justify-start gap-4 w-full">
          {/* Left Layout */}
          <Stack className="!border !border-gray-300 !border-solid !flex-[2] !rounded-md">
            <Stack className="px-3 py-3 space-y-1">
              <Typography className="!font-medium !text-gray-400 !text-xs">
                {`Posted ${renderIntervalDuration(
                  jobDetails?.postedDate,
                  intervalToDuration
                )}`}
              </Typography>

              <Typography className="!font-semibold text-left !text-3xl">
                {jobDetails?.jobTitle}
              </Typography>

              <Box className="flex items-center justify-start space-x-1">
                <Typography className="!capitalize !font-medium !text-xs">
                  {jobDetails?.jobType}
                </Typography>

                <Icon name={"Dot"} size={"1em"} />

                <Typography className="!capitalize !font-medium !text-xs">
                  {jobDetails?.jobLocation}
                </Typography>

                <Icon name={"Dot"} size={"1em"} />

                <Typography className="!capitalize !font-medium !text-xs">
                  {jobDetails?.salaryRange}
                </Typography>
              </Box>
            </Stack>

            <Divider />

            <Stack className="px-3 py-3 space-y-1">
              <Typography className="!font-semibold !text-sm">
                Job Description
              </Typography>

              <Typography className="!font-medium !text-sm">
                {jobDetails?.jobDescription}
              </Typography>
            </Stack>

            <Divider />

            <Stack className="px-3 py-3 space-y-1">
              <Typography className="!font-semibold !text-sm">
                Required Skills
              </Typography>

              <Typography className="!font-medium !text-sm">
                {jobDetails?.requiredSkills}
              </Typography>
            </Stack>

            <Divider />

            <Stack className="px-3 py-3 space-y-1">
              <Typography className="!font-semibold !text-sm">
                Preferred Skills
              </Typography>

              <Typography className="!font-medium !text-sm">
                {jobDetails?.preferredSkills}
              </Typography>
            </Stack>

            <Divider />

            <Stack className="px-3 py-3 space-y-1">
              <Typography className="!font-semibold !text-sm">
                Required Certifications
              </Typography>

              <Typography className="!font-medium !text-sm">
                {jobDetails?.requiredCertifications}
              </Typography>
            </Stack>
          </Stack>

          {/* Right Layout */}
          <Stack className="!flex-[1] px-3 py-2 space-y-5">
            <Stack className="space-y-2">
              <Box className="flex items-center justify-start space-x-2">
                {/* !!!TODO: Add company logo */}
                <Box className="bg-white !border !border-gray-300 !border-solid h-7 min-w-7 overflow-hidden w-7 !rounded-2xl">
                  <img
                    alt={jobDetails?.companyName}
                    src={jobDetails?.companyLogo ?? dummyThumbnail}
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </Box>

                <Typography className="!font-semibold !text-sm">
                  {jobDetails?.companyName}
                </Typography>
              </Box>

              <Divider />

              <Typography className="!font-medium !text-sm">
                {jobDetails?.companyDescription}
              </Typography>
            </Stack>

            <Button
              className="btn btn-primary !w-full"
              disabled={loading.isOpen}
              component={Link}
              to={
                user
                  ? `${paths.get("JOB").PATH}/${jobId}/apply`
                  : paths.get("LOGIN").PATH // !!!TODO: Open a modal asking if user wants to login instead of directing stright to login page
              }
              variant="contained"
            >
              {loading.isOpen ? (
                <CircularProgress size={20} className="!text-black" />
              ) : (
                "Apply Job"
              )}
            </Button>
          </Stack>
        </Box>
      </Stack>

      <Footer />
    </Stack>
  );
};

export default JobDetailsPage;
