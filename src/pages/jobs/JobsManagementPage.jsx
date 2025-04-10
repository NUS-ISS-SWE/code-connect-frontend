/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { GetAPI } from "../../api/GeneralAPI.js";
import JobCards from "../../components/jobPageComponents/JobCards.jsx";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import paths from "../../routes/paths";
import { deleteJobListing } from "../../api/JobPostingsApi.js";

const JobsManagementPage = () => {
  const { state, dispatch } = useGlobalContext();
  const { loading } = state;
  const [filteredJobs, setFilteredJobs] = useState([]);

  const handleDeleteJob = async (jobId) => {
    const { status } = await deleteJobListing(jobId, dispatch);
    if (status === 204) {
      setFilteredJobs((prev) => prev.filter((job) => job.id !== jobId));
      dispatch({
        type: "SHOW_TOAST",
        payload: {
          message: `Job deleted successfully`,
          isOpen: true,
          variant: "success",
        },
      });
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, []);

    const fetchSearchResults = async () => {
      // Fetch search results from API
      const { data } = await GetAPI("jobpostings", dispatch);
  
        // // Filter jobs based on search term and search filters. Filtered data to be returned via API call later
      // const filteredJobs = filterJobs(jobsData, searchTerm, searchFilters);
  
      // Store returned API data in filteredJobs state
      setFilteredJobs(data);
  
      // Update URL params with searchFilters or searchTerm change
      //updateUrlParams(searchTerm, searchFilters);
    };

  return (
    <Stack className="bg-whiteflex flex-1 items-start justify-start min-h-[100vh] w-full">
      <Navbar />

      <Stack className="flex flex-1 items-start justify-start mx-auto max-w-3xl py-8 space-y-12 w-[95vw] lg:w-[70vw]">
        <Stack className="space-y-4 w-full">
          <Stack className="space-y-2 w-full">
            <Box className="flex items-center justify-start w-full">
              <Typography className="!font-medium flex-1 text-left !text-2xl">
                Manage Jobs
              </Typography>

              <Button
                className="btn btn-primary"
                disabled={loading.isOpen}
                component={Link}
                to={paths.get("CREATEJOB").PATH}
                variant="contained"
              >
                {loading.isOpen ? (
                  <CircularProgress size={20} className="!text-black" />
                ) : (
                  "Create Job"
                )}
              </Button>
            </Box>

            <Divider flexItem />
            <Typography className="!font-semibold !text-xs lg:!text-xs text-start !text-gray-900">
          {`${filteredJobs?.length} jobs`}
        </Typography>
        <JobCards filteredJobs={filteredJobs} alreadyApplied={false} showStatusBox={false} hideApplyButton={true} onDelete={handleDeleteJob} />
          </Stack>
        </Stack>
      </Stack>
      <Footer />
    </Stack>
  );
};

export default JobsManagementPage;
