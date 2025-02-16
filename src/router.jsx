import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

const Router = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default Router;
