import globalReducer from "../reducers/globalReducer";

export const GlobalContext = createContext();

export const initialState = {
  confirmDialog: {
    action: undefined,
    data: undefined,
    isOpen: false,
    message: undefined,
  },
  loading: { message: "", isOpen: false },
  showToast: { message: "", isOpen: false },
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
