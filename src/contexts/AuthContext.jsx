/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PATHS } from "../paths";

export const AuthContext = createContext();
export const LOGIN_TOKEN_KEY = "tti-t2";

export const fetchToken = (key) => {
  return localStorage.getItem(key);
};

export const storeToken = (key, token) => {
  if (token) {
    localStorage.setItem(key, token);
  }
};

export const removeToken = (key) => {
  localStorage.removeItem(key);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(fetchToken(LOGIN_TOKEN_KEY) || null);
  const [user, setUser] = useState(null);

  const login = (key, token) => {
    setToken(token);
    storeToken(key, token);
  };

  const logout = () => {
    // navigate(PATHS.get("HOME").PATH);

    setToken(null);
    removeToken(LOGIN_TOKEN_KEY);

    setUser(null);
  };

  useEffect(() => {
    // Auto-logout if token expires
    if (!token) logout();
  }, [token]);

  const authState = {
    token,
    login,
    logout,
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};
