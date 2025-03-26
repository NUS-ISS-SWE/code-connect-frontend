import { Box, Divider, Stack, Typography } from "@mui/material";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Tabs from "../components/common/Tabs";

import { retrieveJob } from "../api/JobPostingsApi";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGlobalContext } from "../hooks/useGlobalContext";
import paths from "../routes/paths";

const JobDetailsPage = () => {
  const { state, dispatch } = useGlobalContext();
  const { setUser, user } = useAuthContext();

  const { jobId } = useParams();

  const [jobData, setJobData] = useState({});

  const JOB_DETAILS_TAB_OPTIONS = [
    {
      path: `${paths.get("JOB").PATH}/${jobId}`,
      title: paths.get("GETJOB").LABEL,
      value: 0,
    },

    {
      path: `${paths.get("JOB").PATH}/${jobId}/${paths.get("EDITJOB").PATH}`,
      title: paths.get("EDITJOB").LABEL,
      value: 1,
    },
  ];

  useEffect(() => {
    if (!jobId) {
      // If no ID is provided, show an empty form for creating a profile
      setJobData({});

      return;
    }

    fetchJob();
  }, [jobId]);

  const fetchJob = async () => {
    const { data, status } = await retrieveJob(jobId, dispatch);

    if (status === 200) {
      setJobData(data);
    }
  };

  //Account for thumbnail and numberApplied for viewing?

  return (
    <Stack className="bg-gray-white flex flex-1 items-start justify-start min-h-[100vh] w-full">
      <Navbar />

      <Stack className="flex flex-1 items-start justify-start mx-auto max-w-3xl py-8 space-y-2 w-[70vw]">
        {/* Tabs !!!TODO: Only Admin and listing owner can view tab */}
        {user && (
          <Stack className="!border-b !border-gray-300 !border-solid w-[100%]">
            <Tabs tabOptions={JOB_DETAILS_TAB_OPTIONS} />
          </Stack>
        )}

        {/* Split Layout */}
        <Box className="flex items-start justify-start space-x-4 w-full">
          <Stack className="!border !border-gray-300 !border-solid flex-2 rounded-sm">
            <Stack className="space-y-2">{jobData.jobTitle}</Stack>
          </Stack>
        </Box>
      </Stack>

      <Footer />
    </Stack>
  );
};

export default JobDetailsPage;
