/* eslint-disable react/prop-types */

import { Box, Divider, Stack, Typography, Button } from "@mui/material";
import { intervalToDuration } from "date-fns";
import dummy from "../../assets/dummy/index.js";
import paths from "../../routes/paths.js";
import Icon from "../../constants/Icon.jsx";
import { renderIntervalDuration } from "../../utils/stringUtils.js";
import { Link } from "react-router-dom";

const JobCard = ({ item, index, alreadyApplied }) => {
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
      <Button
        className={`!bg-primary-main !font-semibold !text-white !w-[20%] hover:!bg-primary-100`}
        // disabled={loading.isOpen}
        component={Link}
        // TODO: change link to view job application page
        //to={alreadyApplied ? paths.get("APPLY_JOB").PATH : paths.get("APPLY_JOB").PATH}
        variant="contained"
      >
        {alreadyApplied ? "View Application" : "Apply Job"}
      </Button>
    </Stack>
  );
};

export default JobCard;
