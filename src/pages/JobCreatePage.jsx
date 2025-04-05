import { Box, Divider, Stack, Typography } from "@mui/material";

import EditJob from "../components/jobPageComponents/EditJob";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Tabs from "../components/common/Tabs";

import { retrieveJob } from "../api/JobPostingsApi";
import Icon from "../constants/Icon";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { JOB_DETAILS_TAB_OPTIONS } from "../utils/tabOptionsUtils";

const JobCreatePage = () => {
  const { state, dispatch } = useGlobalContext();
  const { setUser, user } = useAuthContext();

  const { jobId } = useParams(); // Get profile ID from URL
  const fieldRefs = {
    jobTitle: useRef(null),
  };

  const [formData, setFormData] = useState(undefined);

  useEffect(() => {
    if (!jobId) {
      // If no ID is provided, show an empty form for creating a profile
      setFormData({});
    } else {
      fetchJob();
    }
  }, [jobId]); // Runs when the ID changes

  const fetchJob = async () => {
    const { data, status } = await retrieveJob(jobId, dispatch);

    if (status === 200) {
      setFormData(data);
      // setUser({ ...user, ...data });
    }
  };

  //Account for thumbnail and numberApplied for viewing?

  return (
    formData && (
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
              {jobId ? formData?.jobTitle : "Create Job"}
            </Typography>

            <Box className="flex items-center justify-start space-x-1">
              <Typography className="!font-medium !text-gray-900 !text-xs">
                {`Created on: ${new Date(
                  formData?.postedDate
                ).toLocaleDateString()}`}
              </Typography>

              <Icon name={"Dot"} size={"1em"} />

              <Typography className="!font-medium !text-gray-900 !text-xs">
                {`Last edited: ${new Date(
                  formData?.postedDate
                ).toLocaleDateString()}`}
              </Typography>
            </Box>
          </Stack>

          <Divider flexItem />

          <EditJob
            formData={formData}
            fieldRefs={fieldRefs}
            setFormData={setFormData}
            dispatch={dispatch}
          />
        </Stack>
        <Footer />
      </Stack>
    )
  );
};

export default JobCreatePage;
