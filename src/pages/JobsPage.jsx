/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import images from "../assets/images";
import { useGlobalContext } from "../hooks/useGlobalContext";
import paths from "../routes/paths";

const HomePage = () => {
  const { state, dispatch } = useGlobalContext();

  return (
    <Stack className="bg-gray-100 flex flex-1 items-start justify-start min-h-[100vh] w-full">
      <Navbar />

      <Stack className="flex flex-1 items-start justify-start mx-auto max-w-7xl w-full">
        Jobs
      </Stack>

      <Footer />
    </Stack>
  );
};

export default HomePage;
