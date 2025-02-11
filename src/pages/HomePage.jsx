import { useGlobalContext } from "../hooks/useGlobalContext";

const HomePage = () => {
  const { state, dispatch } = useGlobalContext();

  return (
    <Box className="bg-gray-100 flex flex-1 items-start justify-center min-h-[100vh] w-screen">
      <Stack className="flex flex-1 items-start justify-start max-w-7xl w-full">
        <h1>Home Page</h1>
      </Stack>
    </Box>
  );
};

export default HomePage;
