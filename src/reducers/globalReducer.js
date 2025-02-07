import { initialState } from "../contexts/GlobalContext";

const globalReducer = (state, action) => {
  switch (action.type) {
    case "CONFIRM_DIALOG":
      return { ...state, confirmDialog: action.payload };

    case "LOADING":
      return { ...state, loading: action.payload };

    case "SHOW_TOAST":
      return { ...state, showToast: action.payload };

    case "RESET":
      console.log("RESET", initialState);
      return initialState;

    default:
      return state;
  }
};

export default globalReducer;
