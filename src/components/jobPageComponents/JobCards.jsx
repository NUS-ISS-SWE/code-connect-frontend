/* eslint-disable react/prop-types */
import { Box, Stack, Typography, Skeleton } from "@mui/material";
import JobCard from "./JobCard";

const JobCards = ({
  filteredJobs,
  hideApplyButton = false,
  onDelete,
  isLoading,
}) => {
  return isLoading ? (
    // Skeleton Loading
    <Stack className="justify-start !mt-[-20px] w-full" spacing={-3}>
      {Array.from(Array(5).keys()).map((e, n) => (
        <Stack key={n} spacing={-3} className="h-fit w-full">
          <Skeleton
            animation="wave"
            className="!bg-gray-100 !border !border-gray-300 !border-solid min-h-[140px] rounded-md w-full"
          />
          <Skeleton
            animation="wave"
            className="!bg-gray-100 !border !border-gray-300 !border-solid min-h-[36px] rounded-md w-full"
          />
        </Stack>
      ))}
    </Stack>
  ) : (
    <Stack className="flex justify-start mx-auto max-w-7xl px-2 lg:px-0 space-y-3 w-full">
      {filteredJobs?.length > 0 ? (
        filteredJobs
          .sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate))
          .map((item, index) => (
            <JobCard
              key={index}
              item={item}
              index={index}
              alreadyApplied={item.alreadyApplied}
              hideApplyButton={hideApplyButton}
              onDelete={onDelete}
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
