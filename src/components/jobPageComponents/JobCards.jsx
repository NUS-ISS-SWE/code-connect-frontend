/* eslint-disable react/prop-types */
import { Box, Stack, Typography } from "@mui/material";
import JobCard from "./JobCard";

const JobCards = ({ filteredJobs, alreadyApplied, showStatusBox, hideApplyButton = false }) => {
  return (
    <Stack className="flex justify-start mx-auto max-w-7xl px-2 lg:px-0 space-y-3 w-full">
      {filteredJobs?.length > 0 ? (
        filteredJobs.map((item, index) => (
          <JobCard
            key={index}
            item={item}
            index={index}
            alreadyApplied={alreadyApplied}
            showStatusBox={showStatusBox}
            hideApplyButton={hideApplyButton}
          />
        ))
      ) : (
        <Box className="bg-gray-100 !border !border-gray-300 !border-solid py-2 flex items-center justify-start min-h-[70px] p-3 rounded-md w-full">
          <Typography className="!font-regular !text-sm lg:!text-xs text-start !text-gray-500">
            No records found
          </Typography>
        </Box>
      )}
    </Stack>
  );
};

export default JobCards;
