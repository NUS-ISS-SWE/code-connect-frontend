/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import {
  Button,
  Stack,
} from "@mui/material";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import images from "../assets/images";
import { useGlobalContext } from "../hooks/useGlobalContext";
import paths from "../routes/paths";

const JobsPage = () => {
  const { state, dispatch } = useGlobalContext();

  return (
    <Stack className="bg-gray-100 flex flex-1 items-start justify-start min-h-[100vh] w-full">
      <Navbar />
      <Stack className="flex flex-1 items-start justify-start mx-auto max-w-7xl w-full">
        Jobs
      </Stack>
      <Button
              className="!bg-primary !capitalize !duration-500 !ease-in-out !font-semibold !pb-2 !pl-4 !pr-4 !pt-2 !text-sm !text-white !tracking-normal !transition-all w-full hover:!bg-primary-100 !shadow-none"
              component={Link}
              to={paths.get("CREATEJOB").PATH}
              variant="contained">
              {paths.get("CREATEJOB").LABEL}
      </Button>
      <Footer />
    </Stack>
  );
};

export default JobsPage;
