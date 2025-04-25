/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import { useGlobalContext } from "../hooks/useGlobalContext";
import paths from "../routes/paths";

const UserManagementPage = () => {
  const {
    state: { loading },
    dispatch,
  } = useGlobalContext();

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
   //TODO: fetch all users
  }, []);



  return (
    <Stack className="bg-whiteflex flex-1 items-start justify-start min-h-[100vh] w-full">
      <Navbar />

      <Stack className="flex flex-1 items-start justify-start mx-auto max-w-3xl py-8 space-y-12 w-[95vw] lg:w-[70vw]">
        <Stack className="space-y-4 w-full">
          <Stack className="space-y-2 w-full">
            <Box className="flex items-center justify-start w-full">
              <Typography className="!font-medium flex-1 text-left !text-2xl">
                Manage Users
              </Typography>


            </Box>

            <Divider flexItem />
          </Stack>
        </Stack>
      </Stack>
      <Footer />
    </Stack>
  );
};

export default UserManagementPage;
