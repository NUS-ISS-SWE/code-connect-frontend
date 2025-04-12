import Loader from "./components/common/Loader.jsx";
import Router from "./router.jsx";
import Toast from "./components/common/Toast.jsx";

function App() {
  return (
    <>
      <Loader />

      <Router />

      <Toast />
    </>
  );
}

export default App;
