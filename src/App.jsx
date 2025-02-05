import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Router>
      <nav>
      <Link to="/">Home Page</Link>
      <Link to="/ProfilePage">Profile Page</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
