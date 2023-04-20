import { DetailedUser } from "../../shared/user/interfaces";
import { FetchUserInfoProps } from "./api.types";

export async function fetchUserInfo(props: FetchUserInfoProps) {
  const { handleAxiosCall, userDispatch } = props;

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
