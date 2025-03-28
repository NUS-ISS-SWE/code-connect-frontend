
import {
  Box,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import dummy from "../../assets/dummy/index.js";
import paths from "../../routes/paths.js";
import Icon from "../../constants/Icon.jsx";

const JobCard = ({ item, index }) => {
    return (
      <Stack
      className="!bg-white !border !border-gray-300 !border-solid py-2 rounded-md space-y-2 w-full"
      key={index}
    >
      <Box className="flex flex-1 items-start justify-start px-2  space-x-3">
        <img
          alt={item.jobTitle}
          src={item?.thumbnail ?? dummy.jobListings[0].thumbnail}
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
            to={paths.get("GETJOB").PATH.replace(":jobId", item.id)}
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
          {item.jobLocation}
        </Typography>

        <Icon name={"Dot"} size={"1em"} />

        <Typography className="!font-regular !text-sm lg:!text-xs text-start !text-gray-500">
          {`Posted ${renderIntervalDuration(
            item.postedDate,
            intervalToDuration
          )}`}
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
    )
}

export default JobCard