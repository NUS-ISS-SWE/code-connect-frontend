import { AuthContext } from "../contexts/AuthContext.jsx";

export const useAuthContext = () => {
  return useContext(AuthContext);
};
