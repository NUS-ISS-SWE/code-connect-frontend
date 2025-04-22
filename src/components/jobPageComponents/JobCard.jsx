/* eslint-disable react/prop-types */

import { Box, Divider, Stack, Typography, Button } from "@mui/material";
import { intervalToDuration } from "date-fns";
import dummy from "../../assets/dummy/index.js";
import paths from "../../routes/paths.js";
import Icon from "../../constants/Icon.jsx";
import { renderIntervalDuration } from "../../utils/stringUtils.js";
import { Link } from "react-router-dom";

const JobCard = ({ item, index, alreadyApplied, hideApplyButton = false, onDelete}) => {

  const getPostedAndAppliedDates = (item, alreadyApplied) => {
    const postedString = `Posted ${renderIntervalDuration(
      item.postedDate,
      intervalToDuration
    )} ago`;

    const appliedString = alreadyApplied
      ? `, applied ${renderIntervalDuration(
          item.appliedDate,
          intervalToDuration
        )} ago`
      : "";

    return postedString + appliedString;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Submitted":
        return "bg-gray-100 text-gray-800";
      case "Interviewing":
        return "bg-yellow-100 text-yellow-800";
      case "Offered":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <Stack
      className="!bg-white !border !border-gray-300 !border-solid py-2 rounded-md space-y-2 w-full relative"
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
        { alreadyApplied && <Box
          className={`absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded ${getStatusColor(
            item.status
          )}`}
        >
          {item?.status ?? "Submitted"}
        </Box>}
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

      <Box className="flex flex-1 items-center justify-start px-2 space-x-1 !text-gray-700">
        <Typography className="!font-regular !text-sm lg:!text-xs text-start !text-gray-500">
          {item.jobType}
        </Typography>

        <Icon name={"Dot"} size={"1em"} />

        <Typography className="!font-regular !text-sm lg:!text-xs text-start !text-gray-500">
          {item.jobLocation}
        </Typography>

        <Icon name={"Dot"} size={"1em"} />

        <Typography className="!font-regular !text-sm lg:!text-xs text-start !text-gray-500">
          {getPostedAndAppliedDates(item, alreadyApplied)}
        </Typography>
      </Box>

      <Divider flexItem />

      <Box className="flex flex-1 items-start justify-start px-2 w-full">
        <Box className="flex flex-1 items-start justify-start space-x-1">
          <Typography className="!font-regular !text-sm lg:!text-xs text-start !text-gray-500">
            {`${item.numberApplied} applied`}
          </Typography>

          <Icon name={"Dot"} size={"1em"} />

          <Typography className="!font-regular !text-sm lg:!text-xs text-start !text-primary">
            {item.salaryRange}
          </Typography>
        </Box>
        {hideApplyButton ? (
          <Button
        className="btn btn-secondary !text-error"        
        variant="contained"
        onClick={() => onDelete(item.id)}>
        Delete Job
      </Button>
        ) : 
        (<Button
        className="btn btn-primary"
        // disabled={loading.isOpen}
        component={Link}
        to={alreadyApplied ? paths.get("VIEW_JOB_APPLICATION").PATH.replace(":jobId", item.id).replace(":applicationId", item.applicationId) : paths.get("APPLY_JOB").PATH.replace(":jobId", item.id)}
        variant="contained"
      >
        {alreadyApplied ? "View Application" : "Apply Job"}
      </Button>)
        }
      </Box>
    </Stack>
  );
};

export default JobCard;
