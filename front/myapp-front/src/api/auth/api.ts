import { UserAuthRequest } from "../../shared/auth/interfaces";
import { UserResponse } from "../../shared/user/interfaces";
import { handleUserAuthProps } from "./api.types";

export async function handleUserAuth(props: handleUserAuthProps) {
  const { handleAxiosCall, data, url, setAuthToken, userDispatch, setPopup } =
    props;
  const response = await handleAxiosCall<UserAuthRequest, UserResponse>({
    method: "post",
    url: url,
    data: data,
    needAuth: false,
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
  }
}
