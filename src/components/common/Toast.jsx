import { IconButton, Snackbar } from "@mui/material";
import Icon from "../../constants/Icon.jsx";

import { useGlobalContext } from "../../hooks/useGlobalContext.js";

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
          <Icon name="Close" size={"1.1em"} />
        </IconButton>
      }
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      autoHideDuration={5000}
      ContentProps={{
        className: `${
          showToast.variant === "success"
            ? "!bg-white !border-l-4 !border-success !border-solid !text-gray-900"
            : showToast.variant === "error"
            ? "!bg-white !border-l-4 !border-error !border-solid !text-gray-900"
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
