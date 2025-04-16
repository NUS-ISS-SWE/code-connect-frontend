import { useNavigate } from "react-router-dom";

import { retrieveEmployeeProfile } from "../api/EmployeeProfilesApi";
import { retrieveEmployerProfile } from "../api/EmployerProfilesApi";
import { loginUser } from "../api/UserApi";
import { ROLES } from "../constants/roles";
import { useGlobalContext } from "../hooks/useGlobalContext";
import paths from "../routes/paths";
import {
  fetchToken,
  LOGIN_TOKEN_KEY,
  removeToken,
  storeToken,
} from "../utils/authUtils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { state, dispatch } = useGlobalContext();

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    const storageData = fetchToken(LOGIN_TOKEN_KEY);

    if (storageData?.token) {
      // TODO: Verify if token is valid with backend or check expiration
      // const isValid = await verifyToken(token);
      // isValid ? login(LOGIN_TOKEN_KEY, token) : logout();

      await fetchUserProfile(storageData, dispatch);
    }
  };

  const fetchUserProfile = async (storageData) => {
    if (storageData.role === ROLES.get("employer").value) {
      const { data, status } = await retrieveEmployerProfile(dispatch);

      if (status === 200) {
        setUser(data);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } else if (storageData.role === ROLES.get("employee").value) {
      const { data, status } = await retrieveEmployeeProfile(dispatch);

      if (status === 200) {
        setUser(data);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } else {
      setUser(storageData);
      setIsAuthenticated(true);
    }
  };

  const login = async (formInputs) => {
    const response = await loginUser(formInputs, dispatch);

    if (response.status === 200) {
      const { accessToken, role } = response.data;

      const storageData = {
        token: accessToken,
        role,
        username: formInputs?.username,
      };
      storeToken(LOGIN_TOKEN_KEY, JSON.stringify(storageData));

      await fetchUserProfile(storageData);

      dispatch({
        type: "SHOW_TOAST",
        payload: {
          message: "You have been logged in",
          isOpen: true,
          variant: "success",
        },
      });

      return response;
    }
  };

  const logout = () => {
    navigate(paths.get("HOME").PATH);
    setIsAuthenticated(false);
    removeToken(LOGIN_TOKEN_KEY);

    setUser(null);

    dispatch({
      type: "SHOW_TOAST",
      payload: {
        message: "You have been logged out",
        isOpen: true,
        variant: "success",
      },
    });

    dispatch({
      type: "RESET",
    });
  };

  const authState = {
    fetchUserProfile,
    isAuthenticated,
    login,
    logout,
    setUser,
    user,
  };

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};
