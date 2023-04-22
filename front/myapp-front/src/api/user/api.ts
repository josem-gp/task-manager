import { GenericMessageResponse } from "../../shared/general/interfaces";
import { DetailedUser } from "../../shared/user/interfaces";
import { FetchUserInfoProps, HandleMemberDeleteProps } from "./api.types";

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

// Remove a member from group
export async function handleMemberDelete(props: HandleMemberDeleteProps) {
  const { groupState, groupDispatch, setPopup, handleAxiosCall, elementId } =
    props;

  const response = await handleAxiosCall<undefined, GenericMessageResponse>({
    method: "delete",
    url: `http://localhost:3000/api/v1/groups/${groupState.group.id}/remove_user/${elementId}`,
    needAuth: true,
  });

  if (response) {
    // Remove task from UserTask
    groupDispatch({
      type: "REMOVE_GROUP_MEMBER",
      payload: elementId,
    });
    // Add notification
    setPopup({ message: response.data.message, type: "success" });
  }
}
