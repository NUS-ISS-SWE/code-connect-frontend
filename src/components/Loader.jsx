/* eslint-disable react/prop-types */

import { useGlobalContext } from "../hooks/useGlobalContext";

const Loader = ({ show }) => {
  const { state, dispatch } = useGlobalContext();
  const { loading } = state;

  return loading.isOpen || show ? (
    <Box className="sticky top-0 z-[999]">
      <Stack>
        <LinearProgress />
        <Typography>{loading.message}</Typography>
      </Stack>
    </Box>
  ) : null;
};

export default Loader;
