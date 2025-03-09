import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { intervalToDuration } from "date-fns";
import { Link, useSearchParams } from "react-router-dom";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import dummy from "../assets/dummy/index.js";
import Icon from "../constants/Icon.jsx";
import styles from "../constants/styles.jsx";
import useContent from "../hooks/useContent.js";
import { useGlobalContext } from "../hooks/useGlobalContext";
import useKeyPress from "../hooks/useKeyPress.js";
import { renderIntervalDuration } from "../utils/stringUtils.js";
import { JOB_TYPES_FILTER_OPTIONS } from "../utils/optionUtils.js";

const JobsPage = () => {
  const { state, dispatch } = useGlobalContext();
  const { loading } = state;

  const content = useContent();
  const isEnterPressed = useKeyPress("Enter");
  const [searchParams, setSearchParams] = useSearchParams();

  // Get initial values from URL
  const initialSearch = searchParams.get("search") || "";
  const initialJobType = searchParams.get("jobType") || "";
  const initialLocation = searchParams.get("location") || "";

  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    jobType: initialJobType,
    location: initialLocation,
  });
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  useEffect(() => {
    fetchSearchResults();
  }, []);

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

  const handleFilterChange = (type) => (evt) => {
    setSearchFilters({ ...searchFilters, [type]: evt.target.value });
  };

  useEffect(() => {
    // Update URL params with searchFilters
    const params = {};
    if (searchTerm) params.search = searchTerm;
    if (searchFilters.jobType) params.jobType = searchFilters.jobType;
    if (searchFilters.location) params.location = searchFilters.location;

    setSearchParams(params);

    fetchSearchResults();
  }, [searchFilters]);

  const handleTriggerSearch = () => {
    // Update URL params with searchFilters or searchTerm change
    const params = {};
    if (searchTerm) params.search = searchTerm;
    if (searchFilters.jobType) params.jobType = searchFilters.jobType;
    if (searchFilters.location) params.location = searchFilters.location;

    setSearchParams(params);

    fetchSearchResults();
  };

  const fetchSearchResults = async () => {
    // TODO: Fetch search results from API

    // Load dummy data for now; replace with API call later
    const data = dummy.jobListings;
    // Filter jobs based on search term and search filters. Filtered data to be returned via API call later
    const filteredJobs = filterJobs(data);

    setFilteredJobs(filteredJobs);
  };

  // Filter jobs based on search term and search filters
  const filterJobs = (jobs) => {
    return jobs.filter(
      (job) =>
        (searchFilters.jobType === "" ||
          job.jobType === searchFilters.jobType) &&
        (searchFilters.location === "" ||
          job.location.includes(searchFilters.location)) &&
        (searchTerm === "" ||
          job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  return (
    <Stack className="bg-white flex flex-1 items-start justify-start min-h-[100vh] w-full">
      <Navbar />

      <Box
        className={`bg-cover bg-fixed bg-right-bottom bg-no-repeat flex h-[360px] items-center justify-center w-full`}
        sx={{
          backgroundImage: `url(${content.jobs.head.background})`,
        }}
      >
        <Stack className="flex justify-start mx-auto max-w-7xl px-2 lg:px-0 space-y-3 w-full">
          <Typography className="!font-semibold !text-2xl lg:!text-3xl text-start !text-white">
            {content.jobs.head.header}
          </Typography>

          <Typography className="!font-medium !text-md lg:!text-lg text-start !text-white">
            {content.jobs.head.subheader}
          </Typography>

          <Box className="flex justify-start space-x-2 w-full">
            <TextField
              className="bg-white rounded-sm w-full"
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
                      onClick={() => setSearchTerm("")}
                      edge="end"
                    >
                      <Icon name={"Close"} size={"0.9em"} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              className={`${styles.buttonStyles} !bg-primary !min-w-[78px] !text-white hover:!bg-primary-100`}
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

          {/* Job Type Filter */}
          <FormControl size="small">
            <Select
              className="bg-white min-w-[150px] w-fit"
              displayEmpty
              onChange={handleFilterChange("jobType")}
              name="jobType"
              value={
                JOB_TYPES_FILTER_OPTIONS.find(
                  (f) => searchFilters?.jobType === f.value
                )?.value
              }
            >
              {JOB_TYPES_FILTER_OPTIONS.map((option, index) => {
                return (
                  <MenuItem key={index} value={option.value}>
                    {option.title}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Stack>
      </Box>

      <Stack className="flex flex-1 items-start justify-start mx-auto max-w-7xl px-1 lg:px-0 py-6 !space-y-2 w-full">
        <Typography className="!font-semibold !text-xs lg:!text-xs text-start !text-gray-900">
          {`${filteredJobs?.length} jobs - ${searchTerm || "all"}`}
        </Typography>

        {filteredJobs?.map((item, index) => {
          return (
            <Stack
              className="!bg-white !border !border-gray-300 !border-solid py-2 rounded-md space-y-2 w-full"
              key={index}
            >
              <Box className="flex flex-1 items-start justify-start px-2  space-x-3">
                <img
                  alt={item.jobTitle}
                  src={item.thumbnail}
                  style={{
                    height: "auto",
                    width: "48px",
                  }}
                />

                <Stack>
                  <Typography
                    className="!font-regular !text-sm lg:!text-sm text-start !text-gray-700 hover:underline"
                    component={Link}
                  >
                    {item.companyName}
                  </Typography>
                  <Typography
                    className="!font-regular !text-lg lg:!text-xl text-start !text-primary hover:underline"
                    component={Link}
                  >
                    {item.jobTitle}
                  </Typography>
                </Stack>
              </Box>

              <Box className="flex flex-1 items-center justify-start px-2  space-x-1 !text-gray-700">
                <Typography className="!font-regular !text-sm lg:!text-xs text-start !text-gray-500">
                  {item.jobType}
                </Typography>

                <Icon name={"Dot"} size={"1em"} />

                <Typography className="!font-regular !text-sm lg:!text-xs text-start !text-gray-500">
                  {item.location}
                </Typography>

                <Icon name={"Dot"} size={"1em"} />

                <Typography className="!font-regular !text-sm lg:!text-xs text-start !text-gray-500">
                  {`Posted ${item.postedDate}`}
                  {/* {`Posted ${renderIntervalDuration(
                    item.postedDate,
                    intervalToDuration
                  )}`} */}
                </Typography>
              </Box>

              <Divider flexItem />

              <Box className="flex flex-1 items-start justify-start px-2  space-x-1">
                <Typography className="!font-regular !text-sm lg:!text-xs text-start !text-gray-500">
                  {`${item.numberApplied} applied`}
                </Typography>

                <Icon name={"Dot"} size={"1em"} />

                <Typography className="!font-regular !text-sm lg:!text-xs text-start !text-primary">
                  {item.salaryRange}
                </Typography>
              </Box>
            </Stack>
          );
        })}
      </Stack>

      <Footer />
    </Stack>
  );
};

export default JobsPage;
