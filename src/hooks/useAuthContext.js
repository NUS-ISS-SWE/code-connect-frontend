import { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext.jsx";

export const useAuthContext = () => {
  return useContext(AuthContext);
};
