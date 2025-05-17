import AppRoutes from "./routes/AppRoutes.jsx";
import Loader from "./components/common/Loader.jsx";
import Toast from "./components/common/Toast.jsx";

function App() {
  return (
    <>
      <Loader />

      <AppRoutes />

      <Toast />
    </>
  );
}

export default App;
