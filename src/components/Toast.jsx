import { IconButton, Snackbar } from "@mui/material";
import Icon from "../constants/Icon.jsx";

import { useGlobalContext } from "../hooks/useGlobalContext";

const Toast = () => {
  const { state, dispatch } = useGlobalContext();
  const { showToast } = state;

  const handleCloseSnackbar = () => {
    dispatch({
      type: "SHOW_TOAST",
      payload: {
        isOpen: false,
        message: undefined,
        variant: undefined,
      },
    });
  };

  return (
    <Snackbar
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleCloseSnackbar}
        >
          <Icon name="Close" />
        </IconButton>
      }
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      autoHideDuration={5000}
      ContentProps={{
        className: `${
          showToast.variant === "success"
            ? "!bg-success !text-white"
            : showToast.variant === "error"
            ? "!bg-error !text-white"
            : ""
        } `,
      }}
      message={showToast.message}
      onClose={handleCloseSnackbar}
      open={showToast.isOpen}
    />
  );
};

export default Toast;
