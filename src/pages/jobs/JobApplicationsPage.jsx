/* eslint-disable react-hooks/exhaustive-deps */
import {
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import Footer from "../../components/Footer.jsx";
import Navbar from "../../components/Navbar.jsx";
import { GetAPI } from "../../api/GeneralAPI.js";
import { useGlobalContext } from "../../hooks/useGlobalContext.js";
import JobCards from "../../components/jobPageComponents/JobCards.jsx";
import { extractSalaryRange } from "../../utils/stringUtils.js";

const JobApplicationsPage = () => {
  const {dispatch } = useGlobalContext();
  const [searchParams] = useSearchParams();
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
  const [searchTerm] = useState(initialSearch);
  const [searchFilters] = useState({
    jobType: initialJobType,
    location: initialLocation,
    salaryMin: initialSalaryMin,
    salaryMax: initialSalaryMax,
  });

  useEffect(() => {
    fetchSearchResults(searchTerm, searchFilters);
  }, []);

  const fetchSearchResults = async () => {
    // Fetch search results from API
    const { data } = await GetAPI("jobpostings", dispatch);

    // TODO: Integrate with API to get applied jobs

    // // Filter jobs based on search term and search filters. Filtered data to be returned via API call later
    // const filteredJobs = filterJobs(jobsData, searchTerm, searchFilters);

    // Store returned API data in filteredJobs state
    setFilteredJobs(data);

    // Update URL params with searchFilters or searchTerm change
    //updateUrlParams(searchTerm, searchFilters);
  };

  const getAverageJobSalary = (filteredJobs) => {
    const totalAverageSalary = filteredJobs?.reduce((acc, job) => {
      //Get the mid point of salary range for each job to use for average
      const [ jobMinSalary, jobMaxSalary ] = extractSalaryRange(job.salaryRange);
      return acc + (jobMinSalary + jobMaxSalary) / 2;
    }, 0);
  
    //Then get the average of all jobs
    return totalAverageSalary / filteredJobs.length;
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
                <Typography className="!font-semibold !text-xs lg:!text-xs text-start !text-gray-900">
                  {`${filteredJobs?.length} jobs applied, average salary: $${getAverageJobSalary(filteredJobs)}`}
                </Typography>
      <Divider/>
      <JobCards filteredJobs={filteredJobs} alreadyApplied={true} showStatusBox={true} />
        </Stack>
      <Footer />
    </Stack>
  );
};

export default JobApplicationsPage;
