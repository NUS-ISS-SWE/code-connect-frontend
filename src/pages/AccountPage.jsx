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

  const fieldRefs = {
    currentPassword: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
  };

  const [errors, setErrors] = useState({});
  const [formInputs, setFormInputs] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChangeInput = (key) => (evt) => {
    setErrors((prevState) => {
      const { [key]: _, ...rest } = prevState;
      return rest;
    });

    setFormInputs({ ...formInputs, [key]: evt.target.value });
  };

  const handleClickSave = async (e) => {
    setLoading(true);
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

    setLoading(false);
  };

  const handleUpdatePassword = async () => {
    // !!!TODO: username should be retrieve from fetch profile api
    const { username } = fetchToken(LOGIN_TOKEN_KEY);

    const { data, message, status } = await updatePassword(
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
          message: String(message),
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

      <Stack className="flex flex-1 items-start justify-start mx-auto max-w-3xl py-8 space-y-2 w-[70vw]">
        <Typography variant="h5" sx={{ textAlign: "left" }}>
          Change Password
        </Typography>

        <Divider flexItem />

        <Stack className="flex justify-start py-4 space-y-5 w-full">
          <TextField
            className="mb-0 !w-[50%]"
            color="primary"
            disabled={loading}
            error={!!errors.currentPassword}
            fullWidth
            helperText={errors.currentPassword}
            inputRef={fieldRefs.currentPassword}
            label="Current Password*"
            onChange={handleChangeInput("currentPassword")}
            type={showPassword ? "text" : "password"}
            size="small"
            value={formInputs.currentPassword}
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
            className="mb-0 !w-[50%]"
            color="primary"
            disabled={loading}
            error={!!errors.password}
            fullWidth
            helperText={errors.password}
            inputRef={fieldRefs.password}
            label="New Password*"
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
            className="mb-0 !w-[50%]"
            color="primary"
            disabled={loading}
            error={!!errors.confirmPassword}
            fullWidth
            helperText={errors.confirmPassword}
            inputRef={fieldRefs.confirmPassword}
            label="Re-type New Password*"
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

          <Button
            className="!bg-gray-100 !border !border-gray-300 !border-solid !capitalize !duration-500 !ease-in-out !font-semibold !px-3 !py-2 !shadow-none !text-sm !text-black !tracking-normal !transition-all w-fit hover:!bg-gray-200"
            disabled={loading}
            onClick={handleClickSave}
            variant="contained"
          >
            {loading ? (
              <CircularProgress size={20} className="!text-black" />
            ) : (
              "Change Password"
            )}
          </Button>
        </Stack>
      </Stack>
      <Footer />
    </Stack>
  );
};

export default AccountPage;
