import {
  Avatar,
  Box,
  Button,
  ClickAwayListener,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import logo from "../assets/logo/logo.png";
import Icon from "../constants/Icon";
import { ROLES } from "../constants/roles";
import { useAuthContext } from "../hooks/useAuthContext";
import paths from "../routes/paths";
import { NAV_OPTIONS, PROFILE_MENU_OPTIONS } from "../utils/navOptionsUtils";
import { stringAvatar } from "../utils/stringUtils";

const Navbar = () => {
  const { logout, user } = useAuthContext();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMousedOver, setIsMousedOver] = useState(null);

  // Check if the current link is active
  const isActive = (path) => location.pathname === path;

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      position="sticky"
      className="!bg-white border-b border-gray-200 border-solid  flex items-center justify-center sticky top-0 z-40 w-full"
      elevation={0}
    >
      <Toolbar className="flex items-center justify-between mx-auto max-w-7xl space-x-1 lg:space-x-3 !px-3 lg:!px-0 !py-4 lg:!py-0 w-full">
        {/* Logo */}
        <Box className="flex w-full lg:w-fit items-center">
          <Link to={paths.get("HOME").PATH}>
            <img
              src={logo}
              alt="Code Connect Logo"
              className="h-8 lg:h-7 w-auto"
            />
          </Link>
        </Box>

        {/* Desktop Navigation Links */}
        <Box className="hidden lg:flex flex-1 justify-start px-12 space-x-2">
          {NAV_OPTIONS.map((option) => {
            return (
              <Button
                className={`!capitalize !duration-500 !ease-in-out !font-semibold relative !text-sm !text-black !tracking-normal !transition-all hover:!text-primary ${
                  isActive(option.path) ? "!text-primary" : ""
                }`}
                component={Link}
                key={option.path}
                onMouseEnter={() => setIsMousedOver(option.path)}
                onMouseLeave={() => setIsMousedOver(null)}
                to={option.path}
              >
                {option.title}

                <Box
                  className={`absolute !bg-primary -bottom-[17px] duration-500 h-[3px] margin-x-auto origin-left scale-x-0 transform transition-transform w-3/5 ${
                    isActive(option.path) ? "scale-x-100" : ""
                  } ${
                    isMousedOver && isMousedOver === option.path
                      ? "scale-x-100"
                      : ""
                  }`}
                />
              </Button>
            );
          })}
        </Box>

        <Box className="hidden lg:flex justify-end space-x-4">
          {/* Login & Sign Up Buttons */}
          {!user && (
            <Button
              className="!capitalize !duration-500 !ease-in-out !font-semibold !text-sm !text-primary !tracking-normal !transition-all hover:!text-primary"
              component={Link}
              to={paths.get("LOGIN").PATH}
              onMouseEnter={() => setIsMousedOver("login")}
              onMouseLeave={() => setIsMousedOver(null)}
            >
              Login
              <Box
                className={`absolute !bg-primary -bottom-[15px] duration-500 h-[3px] margin-x-auto origin-left scale-x-0 transform transition-transform w-3/5 ${
                  isMousedOver && isMousedOver === "login" ? "scale-x-100" : ""
                }`}
              />
            </Button>
          )}
          {!user && (
            <Button
              className="!bg-primary !capitalize !duration-500 !ease-in-out !font-semibold !pb-2 !pl-4 !pr-4 !pt-2 !text-sm !text-white !tracking-normal !transition-all hover:!bg-primary-100 !shadow-none"
              component={Link}
              to={paths.get("SIGNUP").PATH}
              variant="contained"
            >
              {paths.get("SIGNUP").LABEL}
            </Button>
          )}
        </Box>

        {/* Profile Button */}
        {user && (
          <ClickAwayListener onClickAway={() => setIsProfileMenuOpen(false)}>
            <IconButton
              className="!bg-gray-100 !p-0 relative !text-gray-400"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <Avatar {...stringAvatar(user.username)} />

              {/* Profile Menu */}
              {isProfileMenuOpen && (
                <Stack
                  className={`absolute bg-white gap-2 mt-1 px-2 py-2 right-0 shadow-lg top-12 w-[200px]`}
                >
                  {user.role === ROLES.get("employer").value ? (
                    <Box className="!cursor-default flex items-center justify-start gap-x-2 px-3 py-2 w-full">
                      <Box className="bg-white border flex !h-10 items-center justify-center rounded-full text-primary !min-w-10">
                        <Icon name={"Employer"} size={"1em"} />
                      </Box>

                      <Stack className="items-start justify-start space-y-0 w-full">
                        <Typography className="!font-bold text-gray-900 text-start !text-sm !truncate !w-[90%]">
                          {user.companyName}
                        </Typography>

                        <Typography className="!font-medium text-gray-900 text-start !text-sm !truncate !w-[90%]">
                          {user.username}
                        </Typography>
                      </Stack>
                    </Box>
                  ) : user.role === ROLES.get("employee").value ? (
                    <Box className="!cursor-default flex items-center justify-start gap-x-2 px-3 py-2 w-full">
                      <Box className="bg-white border flex !h-10 items-center justify-center rounded-full text-primary !min-w-10">
                        <Icon name={"Employee"} size={"1em"} />
                      </Box>

                      <Stack className="items-start justify-start space-y-0 w-full">
                        <Typography className="!font-bold text-gray-900 text-start !text-sm !truncate !w-[90%]">
                          {user.username}
                        </Typography>

                        <Typography className="!font-medium text-gray-900 text-start !text-sm !truncate !w-[90%]">
                          {user.email}
                        </Typography>
                      </Stack>
                    </Box>
                  ) : (
                    <Box className="!cursor-default flex items-center justify-start gap-x-2 px-3 py-2 w-full">
                      <Box className="bg-white border flex !h-10 items-center justify-center rounded-full text-primary !min-w-10">
                        <Icon name={"Globe"} size={"1em"} />
                      </Box>

                      <Stack className="items-start justify-start space-y-0 w-full">
                        <Typography className="!font-bold text-gray-900 text-start !text-sm !truncate !w-[90%]">
                          Administrator
                        </Typography>

                        <Typography className="!font-medium text-gray-900 text-start !text-sm !truncate !w-[90%]">
                          {user.username}
                        </Typography>
                      </Stack>
                    </Box>
                  )}

                  <Divider />

                  {PROFILE_MENU_OPTIONS(user.id)
                    .filter((f) => f.roles.includes(user.role))
                    .map((option, index) => (
                      <Box
                        className="!capitalize !duration-500 !ease-in-out flex !font-medium gap-x-2 items-center !justify-start px-3 py-2 rounded-sm !text-gray-700 !text-start !text-sm !transition-all hover:bg-gray-100 !no-underline"
                        component={Link}
                        key={index}
                        to={option.path}
                      >
                        <Icon name={option.icon} size={"1.2em"} />
                        {option.title}
                      </Box>
                    ))}

                  <Divider />

                  <Box
                    className="!capitalize !duration-500 !ease-in-out flex !font-medium gap-x-2 items-center !justify-start px-3 py-2 rounded-sm !text-gray-700 !text-start !text-sm !transition-all hover:bg-gray-100 !no-underline"
                    onClick={() => logout()}
                  >
                    <Icon name={"Logout"} size={"1.2em"} /> Logout
                  </Box>
                </Stack>
              )}
            </IconButton>
          </ClickAwayListener>
        )}

        {/* Mobile Nav Menu */}
        <IconButton
          aria-label="menu"
          className="!text-black lg:!hidden flex items-center"
          color="inherit"
          edge="start"
          onClick={handleMenuOpen}
        >
          {anchorEl ? (
            <Icon name={"Close"} size={"0.9em"} />
          ) : (
            <Icon name={"Menu"} size={"0.9em"} />
          )}
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          className="mt-4"
          onClose={handleMenuClose}
          open={Boolean(anchorEl)}
        >
          {NAV_OPTIONS.map((option) => {
            return (
              <MenuItem
                className="!capitalize !font-normal !text-sm !text-black"
                component={Link}
                key={option.path}
                onClick={handleMenuClose}
                to={option.path}
              >
                {option.title}
              </MenuItem>
            );
          })}
          {!user && (
            <MenuItem
              className="!capitalize !font-normal !text-sm !text-primary"
              onClick={handleMenuClose}
              component={Link}
              to={paths.get("LOGIN").PATH}
            >
              Login
            </MenuItem>
          )}
          {!user && (
            <MenuItem
              className="!capitalize !font-normal !text-sm !text-primary"
              onClick={handleMenuClose}
              component={Link}
              to={paths.get("SIGNUP").PATH}
            >
              Sign Up
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
    </Box>
  );
};

export default Navbar;
