import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SelectPicker } from "rsuite";
import { Link, useSearchParams } from "react-router-dom";

import { GetAPI } from "../api/GeneralAPI";

import JobCard from "../components/jobPageComponents/JobCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import { retrieveJobListings } from "../api/JobPostingsApi.js";

import Icon from "../constants/Icon.jsx";
import useContent from "../hooks/useContent.js";
import { useGlobalContext } from "../hooks/useGlobalContext.js";
import useKeyPress from "../hooks/useKeyPress.js";
import {
  JOB_TYPES_FILTER_OPTIONS,
  LOCATION_FILTER_OPTIONS,
  SALARY_MAX_FILTER_OPTIONS,
  SALARY_MIN_FILTER_OPTIONS,
} from "../utils/filterOptionsUtils.js";
import {
  extractSalaryRange,
  renderIntervalDuration,
} from "../utils/stringUtils.js";

const JobListingPage = () => {
  const { state, dispatch } = useGlobalContext();
  const { loading } = state;

  const content = useContent();
  const isEnterPressed = useKeyPress("Enter");
  const searchInputRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Get initial values from URL
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

  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    jobType: initialJobType,
    location: initialLocation,
    salaryMin: initialSalaryMin,
    salaryMax: initialSalaryMax,
  });
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  // Update URL params with searchFilters or searchTerm change
  const updateUrlParams = (searchTerm, searchFilters) => {
    const params = {};

    /** Encode the search input so that special characters (e.g. ',', '&', and '=') are safely represented in the URL. */
    if (searchTerm) params.search = encodeURIComponent(searchTerm);

    if (searchFilters?.jobType) params.jobType = searchFilters.jobType;
    if (searchFilters?.location) params.location = searchFilters.location;
    if (searchFilters.salaryMin) params.salaryMin = searchFilters.salaryMin;
    if (searchFilters.salaryMax) params.salaryMax = searchFilters.salaryMax;

    setSearchParams(params);
  };

  // Call fetch search results API on intial render
  useEffect(() => {
    fetchSearchResults(searchTerm, searchFilters);
  }, []);

  // Call fetch search results API on filter change
  useEffect(() => {
    fetchSearchResults(searchTerm, searchFilters);
  }, [searchFilters]);

  // Effect hook listening to keyboard 'Enter' key
  useEffect(() => {
    if (isEnterPressed) {
      handleTriggerSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnterPressed]);

  const handleChangeSearchInput = (evt) => {
    setSearchTerm(evt.target.value);
  };

  const handleClearSearchInput = () => {
    const searchQuery = "";

    // Call API to fetch Search results
    fetchSearchResults(searchQuery, searchFilters);
    // Reset searchTerm state
    setSearchTerm(searchQuery);
  };

  const handleFilterChange = (type) => (value) => {
    // Update searchFilters state
    setSearchFilters({ ...searchFilters, [type]: value || "" });
  };

  const handleClearFilters = () => {
    // Reset searchFilters state
    setSearchFilters({
      jobType: "",
      location: "",
      salaryMin: "",
      salaryMax: "",
    });
  };

  // Call fetch search results API on click of search
  const handleTriggerSearch = () => {
    const searchQuery = searchTerm.trim();

    if (searchQuery !== "") {
      // Call fetch search results API
      fetchSearchResults(searchQuery, searchFilters);

      // Update searchTerm state
      setSearchTerm(searchQuery);
    } else {
      handleClearSearchInput();
    }
  };

  const fetchSearchResults = async (searchTerm, searchFilters) => {
    // Fetch search results from API
    const { data, status } = await retrieveJobListings(dispatch);

    if (status === 200) {
      // Filter jobs based on search term and search filters. Filtered data to be returned via API call later
      const filteredJobs = filterJobs(data, searchTerm, searchFilters);

      // Store returned API data in filteredJobs state
      setFilteredJobs(filteredJobs);

      // Update URL params with searchFilters or searchTerm change
      updateUrlParams(searchTerm, searchFilters);
    }
  };

  // Filter jobs based on search term and search filters
  const filterJobs = (jobs, searchTerm, searchFilters) => {
    return (Array.isArray(jobs) ? jobs : []).filter((job) => {
      const jobTitle =
        searchTerm === "" ||
        job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());

      const jobType =
        searchFilters.jobType === "" || job.jobType === searchFilters.jobType;

      const jobLocation =
        searchFilters.location === "" ||
        job.location.includes(searchFilters.location);

      const minFilter = searchFilters.salaryMin
        ? parseInt(searchFilters.salaryMin, 10)
        : 0;
      const maxFilter =
        searchFilters.salaryMax && searchFilters.salaryMax !== Infinity
          ? parseInt(searchFilters.salaryMax, 10)
          : Infinity;
      const [jobMinSalary, jobMaxSalary] = extractSalaryRange(job.salaryRange);

      return (
        jobTitle &&
        jobType &&
        jobLocation &&
        jobMaxSalary >= minFilter &&
        jobMinSalary <= maxFilter
      );
    });
  };

  return (
    <Stack className="bg-white flex flex-1 items-start justify-start min-h-[100vh] w-full">
      <Navbar />
      <Box
        className={`bg-cover bg-fixed bg-right-bottom bg-no-repeat flex h-[300px] items-center justify-center w-full`}
        sx={{
          backgroundImage: `url(${content.jobs.head.background})`,
        }}
      >
        <Stack className="flex justify-start mx-auto max-w-7xl px-2 lg:px-0 space-y-3 w-[95vw] lg:w-[70vw]">
          <Typography className="!font-semibold !text-2xl lg:!text-3xl text-start !text-white">
            {content.jobs.head.header}
          </Typography>

          <Typography className="!font-medium !text-md lg:!text-lg text-start !text-white">
            {content.jobs.head.subheader}
          </Typography>

          {/* Searchbar */}
          <Box className="flex justify-start space-x-2 w-full">
            <TextField
              className="bg-white rounded-md w-full"
              color="primary"
              disabled={loading.isOpen}
              fullWidth
              onChange={handleChangeSearchInput}
              placeholder={"Search..."}
              size="small"
              value={searchTerm}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    className="!ml-0 !text-gray-400"
                    position="end"
                  >
                    <Icon name={"Search"} size={"1.3em"} />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton
                      className="!text-gray-400"
                      onClick={handleClearSearchInput}
                      edge="end"
                    >
                      <Icon name={"Close"} size={"0.9em"} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              inputRef={searchInputRef}
            />

            <Button
              className="btn btn-primary !min-w-[78px]"
              disabled={loading.isOpen}
              onClick={handleTriggerSearch}
              variant="contained"
            >
              {loading.isOpen ? (
                <CircularProgress size={16} className="!text-white" />
              ) : (
                "Search"
              )}
            </Button>
          </Box>

          {/* Filters */}
          <Box className="flex flex-col lg:flex-row flex-wrap justify-start space-x-0 lg:space-x-2 space-y-2 lg:space-y-0 w-full">
            {/* Job Type */}
            <SelectPicker
              classPrefix="w-full lg:!w-[110px]"
              data={JOB_TYPES_FILTER_OPTIONS}
              onChange={handleFilterChange("jobType")}
              placeholder="Job Type"
              searchable={false}
              // style={{ width: 110 }}
              value={searchFilters?.jobType}
            />

            {/* Location */}
            <SelectPicker
              classPrefix="w-full lg:!w-[110px]"
              data={LOCATION_FILTER_OPTIONS}
              onChange={handleFilterChange("location")}
              placeholder="Location"
              searchable={false}
              value={searchFilters?.location}
            />

            {/* Salary Min Filter */}
            <SelectPicker
              classPrefix="w-full lg:!w-[200px]"
              data={SALARY_MIN_FILTER_OPTIONS}
              disabledItemValues={SALARY_MIN_FILTER_OPTIONS.filter(
                (f) => parseInt(f.value) >= parseInt(searchFilters?.salaryMax)
              ).map((e) => e.value)}
              onChange={handleFilterChange("salaryMin")}
              placeholder="Monthly Salary (Min)"
              searchable={false}
              value={searchFilters?.salaryMin}
            />

            {/* Salary Max Filter */}
            <SelectPicker
              classPrefix="w-full lg:!w-[200px]"
              data={SALARY_MAX_FILTER_OPTIONS}
              disabledItemValues={SALARY_MAX_FILTER_OPTIONS.filter(
                (f) => parseInt(f.value) <= parseInt(searchFilters?.salaryMin)
              ).map((e) => e.value)}
              onChange={handleFilterChange("salaryMax")}
              placeholder="Monthly Salary (Max)"
              searchable={false}
              value={searchFilters?.salaryMax}
            />

            <Typography
              component={Button}
              className="!capitalize !font-medium !text-xs lg:!text-sm text-start !text-white"
              onClick={handleClearFilters}
            >
              Reset all filters
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Stack className="flex flex-1 items-start justify-start mx-auto max-w-7xl px-1 lg:px-0 py-6 !space-y-2 w-[95vw] lg:w-[70vw]">
        <Typography className="!font-semibold !text-xs lg:!text-xs text-start !text-gray-900">
          {`${filteredJobs?.length} jobs - ${
            decodeURIComponent(searchParams.get("search")) === "null"
              ? "all"
              : decodeURIComponent(searchParams.get("search"))
          }`}
        </Typography>

        {filteredJobs?.length > 0 ? (
          filteredJobs?.map((item, index) => {
            return <JobCard item={item} index={index} key={index} />;
          })
        ) : (
          <Box className="bg-gray-100 !border !border-gray-300 !border-solid py-2 flex items-center justify-start min-h-[70px] p-3 rounded-md w-full">
            <Typography className="!font-regular !text-sm lg:!text-xs text-start !text-gray-500">
              No records found
            </Typography>
          </Box>
        )}
      </Stack>

      {/* <Button
        className="!bg-primary !capitalize !duration-500 !ease-in-out !font-semibold !pb-2 !pl-4 !pr-4 !pt-2 !text-sm !text-white !tracking-normal !transition-all w-full hover:!bg-primary-100 !shadow-none"
        component={Link}
        to={paths.get("CREATEJOB").PATH}
        variant="contained"
      >
        {paths.get("CREATEJOB").LABEL}
      </Button> */}
      <Footer />
    </Stack>
  );
};

export default JobListingPage;
