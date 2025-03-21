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

      login(LOGIN_TOKEN_KEY, storageData?.token, storageData?.username);
    }
  };

  const login = (key, token, username) => {
    setUser((prevState) => ({ ...prevState, token }));
    setIsAuthenticated(true);

    storeToken(key, token);
    storeToken(LOGIN_TOKEN_KEY, JSON.stringify({ token, username }));
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
