import { initialState } from "../contexts/GlobalContext";

const globalReducer = (state, action) => {
  switch (action.type) {
    case "CONFIRM_DIALOG":
      return { ...state, confirmDialog: action.payload };

    case "LOADING":
      return { ...state, loading: action.payload };

    case "JOB_DETAILS":
      return { ...state, jobDetails: action.payload };

    case "PROFILE_IMAGE":
      return { ...state, profileImage: action.payload };

    case "PROFILE_RESUME":
      return { ...state, profileResume: action.payload };

    case "REGISTER_DRAFT":
      return { ...state, registerDraft: action.payload };

    case "SHOW_TOAST":
      return { ...state, showToast: action.payload };

    case "RESET":
      return initialState;

    default:
      return state;
  }
};

export default globalReducer;
