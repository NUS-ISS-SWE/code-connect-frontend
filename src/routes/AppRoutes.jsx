import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import paths from "./paths.js";
import Loader from "../components/common/Loader.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";

const AccountPage = lazy(() => import("../pages/AccountPage.jsx"));
const AccountRegisterSuccessPage = lazy(() =>
  import("../pages/AccountRegisterSuccessPage.jsx")
);
const AccountVerifiedPage = lazy(() =>
  import("../pages/AccountVerifiedPage.jsx")
);
const CompleteProfilePage = lazy(() =>
  import("../pages/CompleteProfilePage.jsx")
);
const ErrorPage = lazy(() => import("../pages/ErrorPage.jsx"));
const HomePage = lazy(() => import("../pages/HomePage.jsx"));
const JobApplyPage = lazy(() => import("../pages/jobs/JobApplyPage.jsx"));
const JobApplySuccessPage = lazy(() =>
  import("../pages/jobs/JobApplySuccessPage.jsx")
);

const JobPage = lazy(() => import("../pages/jobs/JobPage.jsx"));
const JobListingPage = lazy(() => import("../pages/jobs/JobListingPage.jsx"));
const JobApplicationsPage = lazy(() =>
  import("../pages/jobs/JobApplicationsPage.jsx")
);
const JobsManagementPage = lazy(() =>
  import("../pages/jobs/JobsManagementPage.jsx")
);
const LoginPage = lazy(() => import("../pages/LoginPage.jsx"));
const ProfilePage = lazy(() => import("../pages/ProfilePage.jsx"));
const SignupPage = lazy(() => import("../pages/SignupPage.jsx"));
const UserManagementPage = lazy(() => import("../pages/UserManagementPage.jsx"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader show={true} />}>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route
            path={paths.get("ACCOUNT_REGISTER_SUCCESS").PATH}
            element={<AccountRegisterSuccessPage />}
          />
          <Route
            path={paths.get("ACCOUNT_VERIFIED").PATH}
            element={<AccountVerifiedPage />}
          />
          <Route path={paths.get("ERROR").PATH} element={<ErrorPage />} />
          <Route path={paths.get("HOME").PATH} element={<HomePage />} />
          <Route path={paths.get("GETJOB").PATH} element={<JobPage />} />
          <Route path={paths.get("JOBS").PATH} element={<JobListingPage />} />
          <Route path={paths.get("LOGIN").PATH} element={<LoginPage />} />
          <Route path={paths.get("SIGNUP").PATH} element={<SignupPage />} />

          <Route
            path={paths.get("COMPLETE_PROFILE").PATH}
            element={<CompleteProfilePage />}
          />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path={paths.get("ACCOUNT").PATH} element={<AccountPage />} />

          <Route
            path={paths.get("PROFILE_VIEW").PATH}
            element={<ProfilePage />}
          />

          <Route
            path={paths.get("APPLY_JOB").PATH}
            element={<JobApplyPage />}
          />

          <Route
            path={paths.get("VIEW_JOB_APPLICATION").PATH}
            element={<JobApplyPage />}
          />

          <Route
            path={paths.get("APPLY_JOB_SUCCESS").PATH}
            element={<JobApplySuccessPage />}
          />

          <Route
            path={paths.get("JOBAPPLICATIONS").PATH}
            element={<JobApplicationsPage />}
          />

          <Route
            path={paths.get("JOBS_MANAGEMENT").PATH}
            element={<JobsManagementPage />}
          />

          <Route path={paths.get("CREATEJOB").PATH} element={<JobPage />} />
          <Route path={paths.get("GETJOB").PATH} element={<JobPage />} />

          <Route
            path={paths.get("USER_MANAGEMENT").PATH}
            element={<UserManagementPage />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
