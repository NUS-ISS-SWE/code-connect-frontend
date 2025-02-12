/* eslint-disable react/prop-types */
import { Box, LinearProgress, Stack, Typography } from "@mui/material";

import { useGlobalContext } from "../hooks/useGlobalContext";

const Loader = ({ show }) => {
  const { state, dispatch } = useGlobalContext();
  const { loading } = state;

  return loading.isOpen || show ? (
    <Box className="">
      <Stack>
        <LinearProgress />
        <Typography>{loading.message}</Typography>
      </Stack>
    </Box>
  ) : null;
};

export default Loader;
