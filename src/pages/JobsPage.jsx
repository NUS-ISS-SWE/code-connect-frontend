import {
  Box,
  Button,
  Divider,
  InputAdornment,
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
import useContent from "../hooks/useContent.js";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { renderIntervalDuration } from "../utils/stringUtils.js";

const JobsPage = () => {
  const { state, dispatch } = useGlobalContext();
  const { loading } = state;

  const content = useContent();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get initial values from URL
  const initialSearch = searchParams.get("search") || "";
  const initialJobType = searchParams.get("jobType") || "";
  const initialLocation = searchParams.get("location") || "";

  const [filters, setFilters] = useState({
    jobType: initialJobType,
    location: initialLocation,
  });
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  useEffect(() => {
    // Load dummy data for now; replace with API call later
    setJobs(dummy.jobListings);
  }, []);

  useEffect(() => {
    // Update URL params whenever filters or searchTerm change
    const params = {};
    if (searchTerm) params.search = searchTerm;
    if (filters.jobType) params.jobType = filters.jobType;
    if (filters.location) params.location = filters.location;

    setSearchParams(params);
  }, [searchTerm, filters, setSearchParams]);

  const handleChangeSearchInput = (evt) => {
    setSearchTerm(evt.target.value);
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
        <Stack className="flex justify-start mx-auto max-w-7xl px-2 lg:px-0 space-y-3 w-full">
          <Typography className="!font-semibold !text-2xl lg:!text-3xl text-start !text-white">
            {content.jobs.head.header}
          </Typography>

          <Typography className="!font-medium !text-md lg:!text-lg text-start !text-white">
            {content.jobs.head.subheader}
          </Typography>

          <TextField
            className="bg-white w-full"
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
                <InputAdornment className="!ml-0 !text-gray-400" position="end">
                  <Icon name={"Search"} size={"1.3em"} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Box>

      <Stack className="flex flex-1 items-start justify-start mx-auto max-w-7xl py-8 !space-y-2 w-full">
        {jobs.map((item, index) => {
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
