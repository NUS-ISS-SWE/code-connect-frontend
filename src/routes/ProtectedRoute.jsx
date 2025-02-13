/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import { useAuthContext } from "../hooks/useAuthContext";
import { PATHS } from "../paths";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page if user is not authenticated
    if (!isAuthenticated) {
      navigate(PATHS.get("LOGIN").PATH);
    }
  }, [isAuthenticated, location]);

  return <Outlet />;
};

export default ProtectedRoute;
