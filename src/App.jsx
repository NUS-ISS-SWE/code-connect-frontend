/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import Loader from "./components/Loader.jsx";
import Toast from "./components/Toast.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";

import { PATHS } from "./paths";

import "./App.css";

const ErrorPage = lazy(() => import("./pages/ErrorPage.jsx"));
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const ProfilePage = lazy(() => import("./pages/ProfilePage.jsx"));
const SignupPage = lazy(() => import("./pages/SignupPage.jsx"));

function App() {
  return (
    <>
      <Loader />

      <Suspense fallback={<Loader show={true} />}>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path={PATHS.get("ERROR").PATH} element={<ErrorPage />} />

            <Route path={PATHS.get("HOME").PATH} element={<HomePage />} />

            <Route path={PATHS.get("LOGIN").PATH} element={<LoginPage />} />

            <Route path={PATHS.get("SIGNUP").PATH} element={<SignupPage />} />
            
            <Route path={PATHS.get("PROFILE").PATH} element={<ProfilePage />} />
            <Route path={PATHS.get("GETPROFILE").PATH} element={<ProfilePage />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
          </Route>
        </Routes>
      </Suspense>

      <Toast />
    </>
  );
}

export default App;
