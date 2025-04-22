import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import Icon from "../constants/Icon";
import useContent from "../hooks/useContent";
//import useGenerateJobs from "../assets/dummy/remove/useGenerateJobs";

const HomePage = () => {
  const content = useContent();
  // useGenerateJobs(); // !!!TO REMOVE: For creating dummy jobs

  return (
    <Stack className="bg-white flex flex-1 items-start justify-start min-h-[100vh] w-full">
      <Navbar />

      {/* Hero */}
      <Stack
        className={`!border-none !border-gray-300 !border-solid flex h-full lg:h-[520px] items-center justify-center relative w-full`}
      >
        {/* Hero Background */}
        <Box
          className={`relative lg:absolute bg-fixed bg-secondary-90 bg-cover bg-no-repeat bg-center blur-[0px] lg:brightness-[0.7] flex h-[200px] lg:h-full w-full`}
          sx={{
            backgroundImage: `url(${content.home.hero.background})`,
          }}
        />

        {/* Hero Body */}
        <Stack
          className={`items-center space-y-4 lg:space-y-8 p-6 w-full lg:w-[800px] z-10`}
        >
          <Typography className="!font-semibold !text-2xl lg:!text-5xl text-center !text-gray-800 lg:!text-white">
            {content.home.hero.header}
          </Typography>

          <Stack className={`items-center space-y-2 w-full lg:w-[300px]`}>
            <Button
              className="!bg-primary !capitalize !duration-500 !ease-in-out !font-semibold !pb-2 !pl-4 !pr-4 !pt-2 !text-sm !text-white !tracking-normal !transition-all w-full hover:!bg-primary-100 !shadow-none"
              component={Link}
              to={content.home.hero.actions[0].path}
              variant="contained"
            >
              {content.home.hero.actions[0].title}
            </Button>

            <Button
              className="!bg-white !border !border-gray-300 !border-solid !capitalize !duration-500 !ease-in-out !font-semibold !pb-2 !pl-4 !pr-4 !pt-2 !text-sm !text-gray-800 !tracking-normal !transition-all w-full hover:!bg-primary-100 !shadow-none"
              component={Link}
              to={content.home.hero.actions[1].path}
              variant="contained"
            >
              {content.home.hero.actions[1].title}
            </Button>
          </Stack>
        </Stack>
      </Stack>

      {/* Body */}
      <Stack className="flex flex-1 items-center justify-start mx-auto max-w-7xl py-16 space-y-2 w-full">
        {/* Header */}
        <Stack className="flex flex-1 items-start justify-start px-6 space-y-8 w-full lg:w-[800px] ">
          <Stack className="flex items-center justify-center space-y-4">
            <Typography className="!font-semibold !text-lg lg:!text-2xl text-center  !text-gray-800">
              {content.home.features.header}
            </Typography>
            <Typography className="!text-sm lg:!text-md text-center  !text-gray-600">
              {content.home.features.subheader}
            </Typography>
          </Stack>
        </Stack>

        {/* Items */}
        <Box className="flex flex-wrap items-start justify-center space-x-0 lg:space-x-4 space-y-2 lg:space-y-0 w-full">
          {content.home.features.items.map((item, idx) => {
            return (
              <Stack
                className="flex items-center justify-center py-8 space-y-6 w-[300px]"
                key={idx}
              >
                {/* Icon */}
                <Box className="bg-primary flex items-center justify-center rounded-full text-white h-16 w-16">
                  <Icon name={item.icon} size={"2em"} />
                </Box>

                {/* Content */}
                <Stack className="flex items-center justify-center space-y-2">
                  <Typography className="!font-semibold !text-md lg:!text-md text-center  !text-gray-800">
                    {item.header}
                  </Typography>

                  <Typography className="!text-sm lg:!text-md text-center !text-gray-600">
                    {item.content}
                  </Typography>
                </Stack>
              </Stack>
            );
          })}
        </Box>
      </Stack>

      <Footer />
    </Stack>
  );
};

export default HomePage;
