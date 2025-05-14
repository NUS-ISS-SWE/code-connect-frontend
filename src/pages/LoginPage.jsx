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
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/logo/logo.png";
import Icon from "../constants/Icon.jsx";
import { ROLES } from "../constants/roles";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGlobalContext } from "../hooks/useGlobalContext";
import paths from "../routes/paths.js";

const LoginPage = () => {
  const { login, user } = useAuthContext();
  const {
    state: { loading },
    dispatch,
  } = useGlobalContext();

  const navigate = useNavigate();
  const fieldRefs = {
    username: useRef(null),
    // email: useRef(null),
    password: useRef(null),
  };

  const [errors, setErrors] = useState({});
  const [formInputs, setFormInputs] = useState({
    // email: "",
    username: "",
    password: "",
    // role: ROLES.get("user").value,
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      navigate(`${paths.get("PROFILE").PATH}/${user.id}`);
    }
  }, []);

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
    e.preventDefault();

    const firstErrorField = validate();

    if (!firstErrorField) {
      await login(formInputs);
    } else {
      if (fieldRefs[firstErrorField]) {
        fieldRefs[firstErrorField].current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

  return (
    <Box
      className="bg-white flex h-[100vh] items-center justify-center relative w-[100vw]"
      component="div"
    >
      {/* Logo */}
      <Box className="flex items-center">
        <Link to={paths.get("HOME").PATH}>
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
            disabled={loading.isOpen}
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
            disabled={loading.isOpen}
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
            disabled={loading.isOpen}
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
                    disabled={loading.isOpen}
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
          disabled={loading.isOpen}
          onClick={handleClickLogin}
          variant="contained"
        >
          {loading.isOpen ? (
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
