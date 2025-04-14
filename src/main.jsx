import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App.jsx";

import { AuthProvider } from "./contexts/AuthContext.jsx";
import { GlobalProvider } from "./contexts/GlobalContext.jsx";

import "rsuite/dist/rsuite.min.css";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalProvider>
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </GlobalProvider>
  </StrictMode>
);
