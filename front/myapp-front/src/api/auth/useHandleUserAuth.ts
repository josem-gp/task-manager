import { UserAuthRequest } from "../../shared/auth/interfaces";
import { UserResponse } from "../../shared/user/interfaces";
import { handleUserAuthProps } from "./useHandleUserAuth.types";
import { useNavigate, useLocation } from "react-router-dom";

function useHandleUserAuth() {
  // To use react-router-dom we need to convert this into a React component or a custom hook
  const navigate = useNavigate();
  const location = useLocation();

  async function handleUserAuth(props: handleUserAuthProps) {
    const { handleAxiosCall, data, url, setAuthToken, userDispatch, setPopup } =
      props;
    const response = await handleAxiosCall<UserAuthRequest, UserResponse>({
      method: "post",
      url: url,
      data: data,
      needAuth: false,
      withCredentials: true,
    });

    if (response) {
      const token = response.headers.authorization.split(" ")[1];
      // To set the Cookie
      setAuthToken(token);
      // To set the token in the context
      userDispatch({ type: "SET_USER_AUTH", payload: token });
      // To set the user info in the context
      userDispatch({ type: "SET_USER", payload: response.data.userObject });

      // Add notification
      setPopup({ message: response.data.message, type: "success" });

      // Check if the current URL is different from http://localhost:3001
      if (location.pathname !== "/") {
        // Navigate to http://localhost:3001
        navigate("/");
      }
    }
  }

  return handleUserAuth;
}

export default useHandleUserAuth;
