import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../api/UserApi";
import { LOGIN_TOKEN_KEY } from "../contexts/AuthContext.jsx";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { PATHS } from "../paths";

const LoginPage = () => {
  const { login } = useAuthContext();
  const { state, dispatch } = useGlobalContext();

  const navigate = useNavigate();
  const fieldRefs = {
    email: useRef(null),
    password: useRef(null),
  };

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const validate = () => {
    const newErrors = {};

    if (!email) newErrors.email = "This field is required";

    if (!password) newErrors.password = "This field is required";

    setErrors(newErrors);

    // Return first key in error object
    return Object.keys(newErrors)[0];
  };

  const handleClickLogin = async (e) => {
    setLoading(true);
    e.preventDefault();

    const firstErrorField = validate();

    if (!firstErrorField) {
      const { data, message, status } = await loginUser(
        { email, password },
        dispatch
      );

      if (status === 200) {
        login(LOGIN_TOKEN_KEY, data);

        dispatch({
          type: "SHOW_TOAST",
          payload: {
            message: "You have been logged in",
            isOpen: true,
            variant: "success",
          },
        });

        navigate(PATHS.get("PROFILE").PATH);
      } else {
        dispatch({
          type: "SHOW_TOAST",
          payload: {
            message: String(message),
            isOpen: true,
            variant: "error",
          },
        });
      }
    } else {
      if (fieldRefs[firstErrorField]) {
        fieldRefs[firstErrorField].current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }

    setLoading(false);
  };

  return (
    <Box component="div">
      <Stack className="bg-gray-100 flex justify-start space-y-8 w-[400px]">
        <Typography>Login</Typography>

        <TextField
          className="mb-0"
          color="primary"
          disabled={loading}
          error={!!errors.email}
          fullWidth
          helperText={errors.email}
          inputRef={fieldRefs.email}
          label=""
          onChange={(e) => setEmail(e.target.value)}
          size="small"
          value={email}
          variant="outlined"
        />

        <TextField
          className="mb-0"
          color="primary"
          disabled={loading}
          error={!!errors.password}
          fullWidth
          helperText={errors.password}
          inputRef={fieldRefs.password}
          label=""
          onChange={(e) => setPassword(e.target.value)}
          size="small"
          value={password}
          variant="outlined"
        />

        <Button
          className="!bg-primary !capitalize !duration-500 !ease-in-out !font-semibold !pb-2 !pl-4 !pr-4 !pt-2 !shadow-none !text-sm !text-white !tracking-normal !transition-all w-32 hover:!bg-primary-100"
          disabled={loading}
          onClick={handleClickLogin}
          variant="contained"
        >
          {loading ? (
            <CircularProgress size={20} className="!text-white" />
          ) : (
            "Login"
          )}
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginPage;
