import { AxiosResponse } from "axios";
import { UserContextAction } from "../../context/user/UserContext";
import { handleAxiosCallProps } from "../../hooks/useAxios/useAxios.types";
import { DetailedUser } from "../../shared/user/interfaces";

export async function fetchUserInfo(
  handleAxiosCall: <T, U>({
    method,
    url,
    data,
    needAuth,
  }: handleAxiosCallProps<T>) => Promise<
    void | AxiosResponse<U, any> | undefined
  >,
  userDispatch: React.Dispatch<UserContextAction>
) {
  const response = await handleAxiosCall<undefined, DetailedUser>({
    method: "get",
    url: "http://localhost:3000/api/v1/users/fetch_user_info",
    needAuth: true,
  });

  if (response) {
    // To set the user in the context
    userDispatch({
      type: "SET_USER",
      payload: response.data.userObject,
    });
    // To set the user tasks in the context
    userDispatch({
      type: "SET_USER_TASKS",
      payload: response.data.userTasks,
    });
    // To set the user groups in the context
    userDispatch({
      type: "SET_USER_GROUPS",
      payload: response.data.userGroups,
    });
  }
}
