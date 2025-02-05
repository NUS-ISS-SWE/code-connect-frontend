import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { intervalToDuration } from "date-fns";

import Icon from "../constants/Icon.jsx";
import Tabs from "../components/Tabs";

import { useAuthContext } from "../hooks/useAuthContext.js";
import { PATHS } from "../paths.js";

const USEFUL_LINKS = new Map([
  [
    "MANAGE_USERS",
    {
      children: [],
      path: "",
      title: "Manage Users",
    },
  ],
]);

const TAB_OPTIONS = new Map([
  [
    "VIEW",
    {
      children: [],
      path: `${PATHS.get("PROFILE").PATH}`,
      title: "View",
    },
  ],
  [
    "EDIT",
    {
      children: [],
      path: "",
      title: "Edit",
    },
  ],
]);

const ProfilePage = () => {
  const { user } = useAuthContext();

  const renderMemberDuration = (date) => {
    const duration = intervalToDuration({
      start: new Date(date),
      end: new Date(),
    });

    const years = !duration.years
      ? ""
      : duration.years > 1
      ? `${duration.years} years`
      : `${duration.years} year`;

    const months = !duration.months
      ? ""
      : duration.months > 1
      ? `${duration.months} months`
      : `${duration.months} month`;

    const days = !duration.days
      ? "Less than a day"
      : duration.days > 1
      ? `${duration.days} days`
      : `${duration.days} day`;

    return `${years} ${months} ${days}`;
  };

  return (
    <Box
      className="flex flex-1 gap-8 items-start justify-center mx-auto max-w-7xl min-h-[80vh] pb-3 lg:pb-6 !pl-4 lg:!pl-0 !pr-4 lg:!pr-0 pt-3 lg:pt-6 w-screen"
      component="div"
    >
      {/* Sidebar Section */}
      <Stack className="flex justify-start shadow space-y-0 w-[25%]">
        <Stack className="!bg-gray-100 flex justify-start !pb-2 !pt-2 space-y-0">
          {Array.from(USEFUL_LINKS).map(([key, value], index) => {
            return (
              <Link
                className="!bg-gray-100 !duration-500 flex !ease-in-out !font-normal gap-x-2 items-center !pb-2 !pl-3 !pr-3 !pt-2 !text-sm !text-black !transition-all hover:!text-primary"
                key={index}
                to={value.path}
              >
                <Icon name={"ArrowRight"} size={"1.5em"} />
                {value.title}
              </Link>
            );
          })}
        </Stack>
      </Stack>

      {/* Body Section */}
      <Stack className="flex items-start justify-start gap-y-1 w-[75%]">
        {/* Tabs */}
        <Stack className="!border-b !border-gray-300 !border-solid w-[100%]">
          <Tabs tabOptions={TAB_OPTIONS} />
        </Stack>

        <Box className="flex items-start justify-start gap-x-4 pt-4">
          <Box className="!bg-gray-100 flex h-24 items-start justify-center overflow-hidden rounded-full !text-gray-300 w-24">
            <Icon name={"User"} size={"117%"} />
          </Box>

          <Stack className="flex items-start justify-start gap-y-2">
            <Stack className="flex gap-y-0">
              <Typography className="!text-sm">{user?.email}</Typography>
              <Typography className="!text-sm">{user?.account_type}</Typography>
            </Stack>

            <Stack className="flex gap-y-0">
              <Typography className="!text-2xl">Member for</Typography>
              <Typography className="!text-sm">
                {renderMemberDuration(user?.create_at)}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default ProfilePage;
