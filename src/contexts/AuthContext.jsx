import { retrieveEmployeeProfile } from "../api/EmployeeProfilesApi";
import { retrieveEmployerProfile } from "../api/EmployerProfilesApi";
import { loginUser } from "../api/UserApi";
import { ROLES } from "../constants/roles";
import { useGlobalContext } from "../hooks/useGlobalContext";
import {
  fetchToken,
  LOGIN_TOKEN_KEY,
  removeToken,
  storeToken,
} from "../utils/authUtils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { state, dispatch } = useGlobalContext();

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

      fetchProfile(storageData, dispatch);
    }
  };

  const fetchProfile = async (storageData) => {
    if (storageData.role === ROLES.get("employer").value) {
      const { data, status } = await retrieveEmployerProfile(dispatch);

      if (status === 200) {
        setUser(data);
      }
    } else if (storageData.role === ROLES.get("employee").value) {
      const { data, status } = await retrieveEmployeeProfile(dispatch);

      if (status === 200) {
        setUser(data);
      }
    } else {
      setUser(storageData);
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

      await fetchProfile(storageData);

      setIsAuthenticated(true);

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
  };

  const authState = {
    isAuthenticated,
    login,
    logout,
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};
