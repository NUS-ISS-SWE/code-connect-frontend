/* eslint-disable react/prop-types */
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Tabs = ({ tabOptions }) => {
  const location = useLocation();

  const [currentTab, setCurrentTab] = useState(
    tabOptions.find((option) => option.path === location.pathname).value
  );

  return (
    <Box className="flex h-[34px] justify-start !pl-0 !pr-0 space-y-0 relative w-full">
      <Box className="absolute bottom-[-1px]">
        {tabOptions.map((option, index) => {
          return (
            <Button
              className={` ${
                currentTab === option.value
                  ? "!bg-white !border-gray-300 !font-medium !text-gray-900"
                  : "!border-transparent !text-gray-400"
              }
              absolute
              !border-l !border-r !border-t !border-solid
              !capitalize !duration-0 flex !ease-in-out !font-normal gap-x-2 items-center !pb-2 !pl-4 !pr-4 !pt-2 !rounded-none !rounded-tl !rounded-tr !text-sm !text-accent !transition-all`}
              component={Link}
              key={index}
              onClick={() => setCurrentTab(option.value)}
              to={option.path}
            >
              {option.title}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

export default Tabs;
