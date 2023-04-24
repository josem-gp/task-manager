import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "./ErrorPage";
import AuthForm from "../components/authForm/AuthForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <AuthForm />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
