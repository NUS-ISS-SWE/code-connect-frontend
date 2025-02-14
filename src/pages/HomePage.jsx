/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import Navbar from "../components/Navbar";

import { useGlobalContext } from "../hooks/useGlobalContext";

const HomePage = () => {
  const { state, dispatch } = useGlobalContext();

  return (
    <Stack className="bg-gray-100 flex flex-1 items-start justify-start min-h-[100vh] w-full">
      <Navbar />

      <Stack className="flex flex-1 items-start justify-start mx-auto max-w-7xl w-full">
        <h1>Home Page</h1>
      </Stack>
    </Stack>
  );
};

export default HomePage;
