import {
  Box,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import { GetAPI } from "../api/GeneralAPI.js";
import useContent from "../hooks/useContent.js";
import { useGlobalContext } from "../hooks/useGlobalContext.js";
import useKeyPress from "../hooks/useKeyPress.js";
import JobCard from "../components/jobPageComponents/JobCard.jsx";

const JobApplicationsPage = () => {
  const { state, dispatch } = useGlobalContext();
  const isEnterPressed = useKeyPress("Enter");
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const initialSearch =
  decodeURIComponent(searchParams.get("search")) === "null"
    ? ""
    : decodeURIComponent(searchParams.get("search"));
const initialJobType = searchParams.get("jobType") || "";
const initialLocation = searchParams.get("location") || "";
const initialSalaryMin = searchParams.get("salaryMin") || "";
const initialSalaryMax =
  searchParams.get("salaryMax") === "Infinity"
    ? Infinity
    : parseInt(searchParams.get("salaryMax"), 10)
    ? searchParams.get("salaryMax")
    : "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [searchFilters, setSearchFilters] = useState({
    jobType: initialJobType,
    location: initialLocation,
    salaryMin: initialSalaryMin,
    salaryMax: initialSalaryMax,
  });

  // Effect hook listening to keyboard 'Enter' key
  useEffect(() => {
    if (isEnterPressed) {
      handleTriggerSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnterPressed]);

  useEffect(() => {
    fetchSearchResults(searchTerm, searchFilters);
  }, []);

  const fetchSearchResults = async (searchTerm, searchFilters) => {
    // Fetch search results from API
    const { data, error } = await GetAPI("jobpostings", dispatch);
    const jobsData = await data.json();

    // // Filter jobs based on search term and search filters. Filtered data to be returned via API call later
    // const filteredJobs = filterJobs(jobsData, searchTerm, searchFilters);

    // Store returned API data in filteredJobs state
    setFilteredJobs(jobsData);

    // Update URL params with searchFilters or searchTerm change
    updateUrlParams(searchTerm, searchFilters);
  };

  const extractSalaryRange = (salaryRange) => {
    if (!salaryRange) return [0, Infinity];

    const salaryNumbers = salaryRange.replace(/[$,]/g, "").split("-");

    if (!salaryNumbers || salaryNumbers.length < 2) return [0, Infinity];

    const minSalary = parseInt(salaryNumbers[0], 10);
    const maxSalary = parseInt(salaryNumbers[1], 10);

    return [minSalary, maxSalary];
  };

  return (
    <Stack className="bg-white flex flex-1 items-start justify-start min-h-[100vh] w-full">
      <Navbar />
      {/* <Box
        className={`bg-cover bg-fixed bg-right-bottom bg-no-repeat flex h-[300px] items-center justify-center w-full`}
        sx={{
          backgroundImage: `url(${content.jobs.head.background})`,
        }}
      > */}
        <Stack className="flex justify-start mx-auto max-w-7xl px-2 lg:px-0 space-y-3 w-full">
        <Typography className="!font-medium flex-1 text-left !text-2xl">
          Applied Jobs
        </Typography>
      <Divider/>
              {filteredJobs?.length > 0 ? (
                filteredJobs?.map((item, index) => {
                  return (
                    <JobCard item={item} index={index}/>
                  );
                })
              ) : (
                <Box className="bg-gray-100 !border !border-gray-300 !border-solid py-2 flex items-center justify-start min-h-[70px] p-3 rounded-md w-full">
                  <Typography className="!font-regular !text-sm lg:!text-xs text-start !text-gray-500">
                    No records found
                  </Typography>
                </Box>
              )}
        </Stack>
      {/* </Box> */}
      <Footer />
    </Stack>
  );
};

export default JobApplicationsPage;
