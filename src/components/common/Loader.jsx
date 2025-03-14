import { Box, LinearProgress, Stack, Typography } from "@mui/material";

import { useGlobalContext } from "../../hooks/useGlobalContext";

const Loader = ({ show }) => {
  const { state, dispatch } = useGlobalContext();
  const { loading } = state;

  return loading.isOpen || show ? (
    <Box className="fixed top-0 z-[999]">
      <Stack>
        <LinearProgress />
        <Typography>{loading.message}</Typography>
      </Stack>
    </Box>
  ) : null;
};

export default Loader;
