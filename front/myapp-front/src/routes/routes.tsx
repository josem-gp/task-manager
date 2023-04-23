import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "./ErrorPage";
import InviteSignup from "../views/inviteSignup/InviteSignup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <InviteSignup />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
