import { GenericMessageResponse } from "../../shared/general/interfaces";
import {
  DetailedUserResponse,
  UserRequest,
  UserResponse,
} from "../../shared/user/interfaces";
import {
  FetchUserInfoProps,
  HandleMemberDeleteProps,
  HandleUserUpdateProps,
} from "./api.types";

export async function fetchUserInfo(props: FetchUserInfoProps) {
  const { handleAxiosCall, userDispatch } = props;

  const response = await handleAxiosCall<undefined, DetailedUserResponse>({
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
    // To set the user groups in the context
    userDispatch({
      type: "SET_ALL_ICONS",
      payload: response.data.allIcons,
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

// Update user
export async function updateUser(
  props: HandleUserUpdateProps,
  data: UserRequest
) {
  const { userState, userDispatch, setPopup, handleAxiosCall } = props;

  const response = await handleAxiosCall<UserRequest, UserResponse>({
    method: "patch",
    url: `http://localhost:3000/api/v1/users/${userState.userObject.user.id}`,
    data: data,
    needAuth: true,
  });

  if (response) {
    // Remove task from UserTask
    userDispatch({
      type: "UPDATE_USER",
      payload: response.data.userObject,
    });
    // Add notification
    setPopup({ message: response.data.message, type: "success" });
  }
}
