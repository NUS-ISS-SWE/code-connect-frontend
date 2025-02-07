import { Outlet, Navigate } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import { PATHS } from "../paths";

const ProtectedRoute = () => {
  const { user } = useAuthContext();

  return user?.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={PATHS.get("LOGIN").PATH} />
  );
};

export default ProtectedRoute;
