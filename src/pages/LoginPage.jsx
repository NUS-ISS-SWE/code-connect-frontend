import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import { loginUser } from "../api/UserApi";
import logo from "../assets/logo/logo.png";
import Icon from "../constants/Icon.jsx";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGlobalContext } from "../hooks/useGlobalContext";
import paths from "../routes/paths.js";

import { LOGIN_TOKEN_KEY } from "../utils/authUtils.js";

const LoginPage = () => {
  const { login } = useAuthContext();
  const { state, dispatch } = useGlobalContext();

  const navigate = useNavigate();
  const fieldRefs = {
    username: useRef(null),
    // email: useRef(null),
    password: useRef(null),
  };

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
    role: "USER",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChangeInput = (key) => (evt) => {
    setErrors((prevState) => {
      const { [key]: _, ...rest } = prevState;
      return rest;
    });

    setFormInputs({ ...formInputs, [key]: evt.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formInputs.username)
      newErrors.username = "Please enter your username!";

    // if (!formInputs.email) newErrors.email = "Please enter email address!";
    // else if (!/\S+@\S+\.\S+/.test(formInputs.email))
    //   newErrors.email = "Invalid email format";

    if (!formInputs.password) {
      newErrors.password = "Password is required";
    } else if (formInputs.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    // Return first key in error object
    return Object.keys(newErrors)[0];
  };

  const handleClickLogin = async (e) => {
    setLoading(true);
    e.preventDefault();

    const firstErrorField = validate();

    if (!firstErrorField) {
      const { data, error, status } = await loginUser(formInputs, dispatch);

      if (!error) {
        login(LOGIN_TOKEN_KEY, data.accessToken);

        dispatch({
          type: "SHOW_TOAST",
          payload: {
            message: "You have been logged in",
            isOpen: true,
            variant: "",
          },
        });

        navigate(paths.get("HOME").PATH);
      } else {
        dispatch({
          type: "SHOW_TOAST",
          payload: {
            message: String(error),
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
    <Box
      className="bg-white flex h-[100vh] items-center justify-center relative w-[100vw]"
      component="div"
    >
      {/* Logo */}
      <Box className="flex items-center">
        <Link to="/">
          <img
            src={logo}
            alt="code connect logo"
            className="absolute h-10 lg:h-11 left-10 top-8 w-auto"
          />
        </Link>
      </Box>

      <Stack className="bg-white !border !border-gray-300 !border-solid flex justify-start px-6 py-8 rounded-md space-y-8 w-[98%] lg:w-[400px]">
        <Stack className="flex justify-start space-y-2">
          <Typography className="!font-semibold !text-4xl !text-gray-900">
            Login
          </Typography>

          <Box className="flex justify-start space-x-1">
            <Typography className="!font-normal !text-sm !text-gray-700">
              New user?
            </Typography>

            <Link
              className={`!font-normal !text-sm !text-primary hover:underline`}
              to={paths.get("SIGNUP").PATH}
            >
              Create an account
            </Link>
          </Box>
        </Stack>

        <Stack className="flex justify-start space-y-5">
          <TextField
            className="mb-0"
            color="primary"
            disabled={loading}
            error={!!errors.username}
            fullWidth
            helperText={errors.username}
            inputRef={fieldRefs.username}
            label="Username*"
            onChange={handleChangeInput("username")}
            size="small"
            value={formInputs.username}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment className="!ml-0 !text-gray-400" position="end">
                  <Icon name={"UserLine"} size={"1.3em"} />
                </InputAdornment>
              ),
            }}
          />

          {/* <TextField
            className="mb-0"
            color="primary"
            disabled={loading}
            error={!!errors.email}
            fullWidth
            helperText={errors.email}
            inputRef={fieldRefs.email}
            label="Email Address*"
            onChange={handleChangeInput("email")}
            size="small"
            value={formInputs.email}
            variant="outlined"
          /> */}

          <TextField
            className="mb-0"
            color="primary"
            disabled={loading}
            error={!!errors.password}
            fullWidth
            helperText={errors.password}
            inputRef={fieldRefs.password}
            label="Password*"
            onChange={handleChangeInput("password")}
            type={showPassword ? "text" : "password"}
            size="small"
            value={formInputs.password}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment className="!ml-0 !text-gray-400" position="end">
                  <Icon name={"Lock"} size={"1.3em"} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment className="!ml-0" position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    className="!text-gray-400"
                    disabled={loading}
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <Icon name={"EyeOff"} />
                    ) : (
                      <Icon name={"Eye"} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Button
          className="!bg-primary !capitalize !duration-500 !ease-in-out !font-semibold !pb-2 !pl-4 !pr-4 !pt-2 !shadow-none !text-sm !text-white !tracking-normal !transition-all w-full hover:!bg-primary-100"
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
