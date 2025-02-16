/* eslint-disable react/jsx-no-undef */
import logo from "../assets/logo/logo.png";
import Icon from "../constants/Icon";
import { useAuthContext } from "../hooks/useAuthContext";
import paths from "../routes/paths";

export const NAV_OPTIONS = [
  { title: paths.get("HOME").LABEL, path: paths.get("HOME").PATH },
  { title: paths.get("JOBS").LABEL, path: paths.get("JOBS").PATH },
];

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
      <Toolbar className="flex items-center justify-between mx-auto max-w-7xl space-x-3 !px-3 lg:!px-0 !py-4 lg:!py-0 w-full">
        {/* Logo */}
        <Box className="flex items-center">
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

          {/* Profile Button */}
          {user && (
            <ClickAwayListener onClickAway={() => setIsProfileMenuOpen(false)}>
              <IconButton
                className="!bg-gray-200 relative !text-gray-400"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                <Icon name={"User"} size={"0.9em"} />

                {/* Profile Menu */}
                {isProfileMenuOpen && (
                  <Box
                    className={`absolute bg-white mt-0.5 shadow top-12 right-0`}
                  >
                    <Stack className={`!w-max`}>
                      <Box
                        className="!capitalize !font-semibold gap-x-2 !justify-start !pb-3 !pl-5 !pr-5 !pt-3 !text-black !text-start !text-sm hover:!text-primary"
                        component={Link}
                        to={paths.get("PROFILE").PATH}
                      >
                        View Profile
                      </Box>
                      <Box
                        className="!capitalize !font-semibold gap-x-2 !justify-start !pb-3 !pl-5 !pr-5 !pt-3 !text-black !text-start !text-sm hover:!text-primary"
                        onClick={() => logout()}
                      >
                        Logout
                      </Box>
                    </Stack>
                  </Box>
                )}
              </IconButton>
            </ClickAwayListener>
          )}
        </Box>

        {/* Mobile Menu */}
        <div className="lg:hidden flex items-center">
          <IconButton
            aria-label="menu"
            className="!text-black"
            color="inherit"
            edge="start"
            onClick={handleMenuOpen}
          >
            {anchorEl ? (
              <Icon name={"Close"} size={"1.1em"} />
            ) : (
              <Icon name={"Menu"} size={"1.1em"} />
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
        </div>
      </Toolbar>
    </Box>
  );
};

export default Navbar;
