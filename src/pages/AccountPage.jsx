import {
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import { updatePassword } from "../api/UserApi";
import Icon from "../constants/Icon";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { fetchToken, LOGIN_TOKEN_KEY } from "../utils/authUtils";

const INITIAL_STATE = {
  currentPassword: "",
  password: "",
  confirmPassword: "",
};

const AccountPage = () => {
  const { state, dispatch } = useGlobalContext();
  const { loading } = state;

  const fieldRefs = {
    currentPassword: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
  };

  const [errors, setErrors] = useState({});
  const [formInputs, setFormInputs] = useState(INITIAL_STATE);
  const [showPassword, setShowPassword] = useState({});

  const handleChangeInput = (key) => (evt) => {
    setErrors((prevState) => {
      const { [key]: _, ...rest } = prevState;
      return rest;
    });

    setFormInputs({ ...formInputs, [key]: evt.target.value });
  };

  const handleToggleShowPassword = (key) => () => {
    setShowPassword({ ...showPassword, [key]: !showPassword[key] });
  };

  const handleClickChangePassword = async (e) => {
    e.preventDefault();

    const firstErrorField = validate();

    if (!firstErrorField) {
      handleUpdatePassword();
    } else {
      if (fieldRefs[firstErrorField]) {
        fieldRefs[firstErrorField]?.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

  const handleUpdatePassword = async () => {
    // !!!TODO: username should be retrieve from fetch profile api
    const { username } = fetchToken(LOGIN_TOKEN_KEY);

    const { data, error, status } = await updatePassword(
      {
        username,
        password: formInputs.currentPassword,
        newPassword: formInputs.password,
      },
      dispatch
    );

    if (status === 200) {
      setFormInputs(INITIAL_STATE);

      dispatch({
        type: "SHOW_TOAST",
        payload: {
          message: "Password has been successfully updated",
          isOpen: true,
          variant: "success",
        },
      });
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
  };

  const validate = () => {
    const newErrors = {};

    if (!formInputs.currentPassword) {
      newErrors.currentPassword = "Password is required";
    } else if (formInputs.currentPassword.length < 6) {
      newErrors.currentPassword = "Password must be at least 6 characters";
    }

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

  return (
    <Stack className="bg-whiteflex flex-1 items-start justify-start min-h-[100vh] w-full">
      <Navbar />

      <Stack className="flex flex-1 items-start justify-start mx-auto max-w-3xl py-8 space-y-12 w-[95vw] lg:w-[70vw]">
        <Stack className="space-y-4 w-full">
          <Stack className="space-y-2 w-full">
            <Typography className="!font-medium flex-1 text-left !text-2xl">
              Change Password
            </Typography>

            <Divider flexItem />
          </Stack>

          <Stack className="flex justify-start py-4 space-y-5 w-full">
            <TextField
              className="mb-0 !w-[50%]"
              color="primary"
              disabled={loading.isOpen}
              error={!!errors.currentPassword}
              fullWidth
              helperText={errors.currentPassword}
              inputRef={fieldRefs.currentPassword}
              label="Current Password*"
              onChange={handleChangeInput("currentPassword")}
              type={showPassword.currentPassword ? "text" : "password"}
              size="small"
              value={formInputs.currentPassword}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    className="!ml-0 !text-gray-400"
                    position="end"
                  >
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
                      onClick={handleToggleShowPassword("currentPassword")}
                    >
                      {showPassword.currentPassword ? (
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
              className="mb-0 !w-[50%]"
              color="primary"
              disabled={loading.isOpen}
              error={!!errors.password}
              fullWidth
              helperText={errors.password}
              inputRef={fieldRefs.password}
              label="New Password*"
              onChange={handleChangeInput("password")}
              type={showPassword.password ? "text" : "password"}
              size="small"
              value={formInputs.password}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    className="!ml-0 !text-gray-400"
                    position="end"
                  >
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
                      onClick={handleToggleShowPassword("password")}
                    >
                      {showPassword.password ? (
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
              className="mb-0 !w-[50%]"
              color="primary"
              disabled={loading.isOpen}
              error={!!errors.confirmPassword}
              fullWidth
              helperText={errors.confirmPassword}
              inputRef={fieldRefs.confirmPassword}
              label="Re-type New Password*"
              onChange={handleChangeInput("confirmPassword")}
              type={showPassword.confirmPassword ? "text" : "password"}
              size="small"
              value={formInputs.confirmPassword}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    className="!ml-0 !text-gray-400"
                    position="end"
                  >
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
                      onClick={handleToggleShowPassword("confirmPassword")}
                    >
                      {showPassword.confirmPassword ? (
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
            className='btn btn-primary'
            disabled={loading.isOpen}
            onClick={handleClickChangePassword}
            variant="contained"
          >
            {loading.isOpen ? (
              <CircularProgress size={20} className="!text-black" />
            ) : (
              "Change Password"
            )}
          </Button>
        </Stack>

        {/* <Stack className="space-y-4 w-full">
          <Stack className="space-y-2 w-full">
            <Typography variant="h5" sx={{ textAlign: "left" }}>
              New Section
            </Typography>

            <Divider flexItem />
          </Stack>
        </Stack> */}
      </Stack>

      <Footer />
    </Stack>
  );
};

export default AccountPage;
