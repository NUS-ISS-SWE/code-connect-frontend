import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import paths from "./paths.js";
import Loader from "../components/common/Loader.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";

const AccountPage = lazy(() => import("../pages/AccountPage.jsx"));
const ErrorPage = lazy(() => import("../pages/ErrorPage.jsx"));
const HomePage = lazy(() => import("../pages/HomePage.jsx"));
const JobPage = lazy(() => import("../pages/JobPage.jsx"));
const JobListingPage = lazy(() => import("../pages/JobListingPage.jsx"));
const JobApplicationsPage = lazy(() => import("../pages/JobApplicationsPage.jsx"));
const JobsManagementPage = lazy(() =>
  import("../pages/JobsManagementPage.jsx")
);
const LoginPage = lazy(() => import("../pages/LoginPage.jsx"));
const ProfilePage = lazy(() => import("../pages/ProfilePage.jsx"));
const SignupPage = lazy(() => import("../pages/SignupPage.jsx"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader show={true} />}>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path={paths.get("ERROR").PATH} element={<ErrorPage />} />

          <Route path={paths.get("HOME").PATH} element={<HomePage />} />

          <Route path={paths.get("JOBS").PATH} element={<JobListingPage />} />

          <Route path={paths.get("JOBAPPLICATIONS").PATH} element={<JobApplicationsPage />} />

          <Route path={paths.get("LOGIN").PATH} element={<LoginPage />} />

          <Route path={paths.get("SIGNUP").PATH} element={<SignupPage />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path={paths.get("ACCOUNT").PATH} element={<AccountPage />} />

          <Route path={paths.get("PROFILE").PATH} element={<ProfilePage />} />
          <Route
            path={paths.get("GETPROFILE").PATH}
            element={<ProfilePage />}
          />

          <Route
            path={paths.get("JOBS_MANAGEMENT").PATH}
            element={<JobsManagementPage />}
          />

          <Route
            path={paths.get("CREATEJOB").PATH}
            element={<JobPage />}
          />
          <Route path={paths.get("GETJOB").PATH} element={<JobPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
