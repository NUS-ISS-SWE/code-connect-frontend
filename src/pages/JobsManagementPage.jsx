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

import styles from "../constants/styles";
import { useGlobalContext } from "../hooks/useGlobalContext";
import paths from "../routes/paths";

const JobsManagementPage = () => {
  const { state } = useGlobalContext();
  const { loading } = state;

  return (
    <Stack className="bg-whiteflex flex-1 items-start justify-start min-h-[100vh] w-full">
      <Navbar />

      <Stack className="flex flex-1 items-start justify-start mx-auto max-w-3xl py-8 space-y-12 w-[70vw]">
        <Stack className="space-y-4 w-full">
          <Stack className="space-y-2 w-full">
            <Box className="flex items-center justify-start w-full">
              <Typography className="!font-medium flex-1 text-left !text-2xl">
                Manage Jobs
              </Typography>

              <Button
                className={`${styles.buttonStyles} !bg-primary-main !font-semibold !text-white w-fit hover:!bg-primary-100`}
                disabled={loading.isOpen}
                component={Link}
                to={paths.get("CREATEJOB").PATH}
                variant="contained"
              >
                {loading.isOpen ? (
                  <CircularProgress size={20} className="!text-black" />
                ) : (
                  "Create Job"
                )}
              </Button>
            </Box>

            <Divider flexItem />
          </Stack>
        </Stack>
      </Stack>

      <Footer />
    </Stack>
  );
};

export default JobsManagementPage;
