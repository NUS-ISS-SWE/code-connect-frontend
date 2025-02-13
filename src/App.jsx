/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import Loader from "./components/Loader.jsx";
import Router from "./router.jsx";
import Toast from "./components/Toast.jsx";

import "./App.css";

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
