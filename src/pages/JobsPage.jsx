import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import Icon from "../constants/Icon.jsx";
import { useGlobalContext } from "../hooks/useGlobalContext";

const JobsPage = () => {
  const { state, dispatch } = useGlobalContext();
  const { loading } = state;

  const handleChangeSearchInput = () => {};

  return (
    <Stack className="bg-gray-100 flex flex-1 items-start justify-start min-h-[100vh] w-full">
      <Navbar />

      <Stack className="flex flex-1 items-start justify-start mx-auto max-w-7xl w-full">
        <Stack className="flex justify-start space-y-5 w-full">
          <TextField
            className="bg-white w-full"
            color="primary"
            disabled={loading.isOpen}
            fullWidth
            onChange={handleChangeSearchInput}
            placeholder={"Search..."}
            size="small"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment className="!ml-0 !text-gray-400" position="end">
                  <Icon name={"Search"} size={"1.3em"} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Stack>

      <Footer />
    </Stack>
  );
};

export default JobsPage;
