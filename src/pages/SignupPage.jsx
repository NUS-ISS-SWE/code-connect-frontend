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
import { useState } from "react";
import { Link } from "react-router-dom";

import { registerUser } from "../api/UserApi";
import logo from "../assets/logo/logo.png";
import TermsAndConditionsModal from "../components/modals/TermsAndConditionsModal.jsx";
import Icon from "../constants/Icon.jsx";
import { ROLES } from "../constants/roles.js";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGlobalContext } from "../hooks/useGlobalContext";
import paths from "../routes/paths.js";

const SignupPage = () => {
  const { user } = useAuthContext();
  const { state, dispatch } = useGlobalContext();

  const navigate = useNavigate();
  const fieldRefs = {
    username: useRef(null),
    // email: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
  };

  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: ROLES.get("user").value,
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      navigate(paths.get("PROFILE").PATH);
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

    if (!formInputs.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formInputs.password !== formInputs.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    // Return first key in error object
    return Object.keys(newErrors)[0];
  };

  const handleClickSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const firstErrorField = validate();

    if (!firstErrorField) {
      ShowModal(true);
    } else {
      if (fieldRefs[firstErrorField]) {
        fieldRefs[firstErrorField]?.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }

    setLoading(false);
  };

  const RegisterAndLoginUser = async () => {
    const { data, error, status } = await registerUser(formInputs, dispatch);

    if (status === 200) {
      //TODO: Navigate to Complete Profile Page
      // navigate(paths.get("COMPLETE_PROFILE").PATH);
    }
  };

  const ShowModal = (show) => {
    setShowModal(show);
  };

  return (
    <Box
      className="bg-white flex h-[100vh] items-center justify-center relative w-[100vw]"
      component="div"
    >
      <TermsAndConditionsModal
        open={showModal}
        onClose={() => ShowModal(false)}
        onAccept={() => RegisterAndLoginUser(true)}
      />
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
            Sign Up
          </Typography>

          <Box className="flex justify-start space-x-1">
            <Typography className="!font-normal !text-sm !text-gray-700">
              Already have an account?
            </Typography>

            <Link
              className={`!font-normal !text-sm !text-primary hover:underline`}
              to={paths.get("LOGIN").PATH}
            >
              Login
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

          <TextField
            className="mb-0"
            color="primary"
            disabled={loading}
            error={!!errors.confirmPassword}
            fullWidth
            helperText={errors.confirmPassword}
            inputRef={fieldRefs.confirmPassword}
            label="Re-type Password*"
            onChange={handleChangeInput("confirmPassword")}
            type={showPassword ? "text" : "password"}
            size="small"
            value={formInputs.confirmPassword}
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
          onClick={handleClickSubmit}
          variant="contained"
        >
          {loading ? (
            <CircularProgress size={20} className="!text-white" />
          ) : (
            "Sign up"
          )}
        </Button>
      </Stack>
    </Box>
  );
};

export default SignupPage;
