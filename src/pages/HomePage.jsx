/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import images from "../assets/images";
import { useGlobalContext } from "../hooks/useGlobalContext";
import paths from "../routes/paths";
import Icon from "../constants/Icon";

const FEATURES = [
  {
    icon: "Briefcase",
    header: "Curated Job Listings",
    content:
      "Discover job opportunities tailored to your skills and experience. ",
  },
  {
    icon: "BarChart",
    header: "Skill Gap Analysis",
    content: "Identify areas for improvement with personalized insights.",
  },
  {
    icon: "Tools",
    header: "Interview Preparation",
    content:
      "Ace interviews with coding challenges, mock interview sessions, and real-world technical questions.",
  },
  {
    icon: "ShakeHands",
    header: "Professional Networking",
    content:
      "Connect with like-minded developers, mentors, and hiring managers.",
  },
];

const HomePage = () => {
  const { state, dispatch } = useGlobalContext();

  return (
    <Stack className="bg-white flex flex-1 items-start justify-start min-h-[100vh] w-full">
      <Navbar />

      {/* Hero */}
      <Stack
        className={`!border-none !border-gray-300 !border-solid flex h-full lg:h-[520px] items-center justify-center relative w-full`}
      >
        {/* Hero Background */}
        <Box
          className={`relative lg:absolute bg-secondary-90 bg-cover bg-no-repeat bg-center blur-[0px] lg:brightness-[0.7] flex h-[200px] lg:h-full w-full`}
          sx={{
            backgroundImage: `url(${images.heroBackground})`,
          }}
        />

        {/* Hero Body */}
        <Stack
          className={`items-center space-y-4 lg:space-y-8 p-6 w-full lg:w-[800px] z-10`}
        >
          <Typography className="!font-semibold !text-2xl lg:!text-5xl text-center !text-gray-800 lg:!text-white">
            Empowering Developers, Bridging Talent and Opportunity.
          </Typography>

          <Stack className={`items-center space-y-2 w-full lg:w-[300px]`}>
            <Button
              className="!bg-primary !capitalize !duration-500 !ease-in-out !font-semibold !pb-2 !pl-4 !pr-4 !pt-2 !text-sm !text-white !tracking-normal !transition-all w-full hover:!bg-primary-100 !shadow-none"
              component={Link}
              to={paths.get("SIGNUP").PATH}
              variant="contained"
            >
              Join Now
            </Button>

            <Button
              className="!bg-white !border !border-gray-300 !border-solid !capitalize !duration-500 !ease-in-out !font-semibold !pb-2 !pl-4 !pr-4 !pt-2 !text-sm !text-gray-800 !tracking-normal !transition-all w-full hover:!bg-primary-100 !shadow-none"
              component={Link}
              to={paths.get("JOBS").PATH}
              variant="contained"
            >
              Explore Jobs
            </Button>
          </Stack>
        </Stack>
      </Stack>

      {/* Body */}
      <Stack className="flex flex-1 items-center justify-start mx-auto max-w-7xl py-16 w-full">
        {/* Header */}
        <Stack className="flex flex-1 items-start justify-start px-6 space-y-8 w-full lg:w-[800px] ">
          <Stack className="flex items-center justify-center space-y-4">
            <Typography className="!font-semibold !text-lg lg:!text-2xl text-center  !text-gray-800">
              Unlock Your Full Potential with CodeConnect
            </Typography>
            <Typography className="!text-sm lg:!text-md text-center  !text-gray-600">
              Empowering developers with the right tools to find jobs, improve
              skills, and grow their careers. Explore our key features designed
              to help you succeed in the tech industry.
            </Typography>
          </Stack>
        </Stack>

        {/* Items */}
        <Box className="flex flex-wrap items-start justify-center space-x-0 lg:space-x-4 space-y-2 lg:space-y-0 w-full">
          {FEATURES.map((item, idx) => {
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
