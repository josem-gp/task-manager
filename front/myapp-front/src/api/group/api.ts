import { GenericMessageResponse } from "../../shared/general/interfaces";
import {
  DetailedGroup,
  GroupRequest,
  GroupResponse,
} from "../../shared/group/interfaces";
import {
  FetchGroupInfoProps,
  HandleGroupCreateProps,
  HandleGroupDeleteProps,
  HandleGroupUpdateProps,
} from "./api.types";

// Fetch Group info from the API
export async function fetchGroupInfo(props: FetchGroupInfoProps) {
  const { handleAxiosCall, dispatch, selectedGroupId } = props;
  const response = await handleAxiosCall<undefined, DetailedGroup>({
    method: "get",
    url: `${process.env.REACT_APP_API_URL}/api/v1/groups/${selectedGroupId}`,
    needAuth: true,
  });

  if (response) {
    // To set the group in the context
    dispatch({
      type: "SET_GROUP",
      payload: response.data.group,
    });
    // To set the group users in the context
    dispatch({
      type: "SET_GROUP_MEMBERS",
      payload: response.data.groupUsers,
    });
    // To set the group tags in the context
    dispatch({
      type: "SET_GROUP_TAGS",
      payload: response.data.groupTags,
    });
    // To set the group invitations in the context
    dispatch({
      type: "SET_GROUP_INVITATIONS",
      payload: response.data.groupInvitations,
    });
  }
}

// Create a group
export async function handleGroupCreate(
  props: HandleGroupCreateProps,
  data: GroupRequest
) {
  const { userDispatch, setPopup, handleAxiosCall, handleClose } = props;

  const response = await handleAxiosCall<GroupRequest, GroupResponse>({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/api/v1/groups`,
    data: data,
    needAuth: true,
  });

  if (response) {
    // Add task to userTasks after task creation
    userDispatch({
      type: "ADD_USER_GROUP",
      payload: response.data.group,
    });
    // Add notification
    setPopup({ message: response.data.message, type: "success" });
  }

  // Closing the modal
  handleClose();
}

// Remove a task
export async function handleGroupDelete(props: HandleGroupDeleteProps) {
  const { userDispatch, setPopup, handleAxiosCall, elementId } = props;

  const response = await handleAxiosCall<undefined, GenericMessageResponse>({
    method: "delete",
    url: `${process.env.REACT_APP_API_URL}/api/v1/groups/${elementId}`,
    needAuth: true,
  });

  if (response) {
    // Remove task from UserTasks
    userDispatch({
      type: "REMOVE_USER_GROUP",
      payload: elementId,
    });
    // Add notification
    setPopup({ message: response.data.message, type: "success" });
  }
}

// Update a specific task in the userTasks state
export async function handleGroupUpdate(
  props: HandleGroupUpdateProps,
  data: GroupRequest
) {
  const { userDispatch, setPopup, handleAxiosCall, element, handleClose } =
    props;

  const response = await handleAxiosCall<GroupRequest, GroupResponse>({
    method: "patch",
    url: `${process.env.REACT_APP_API_URL}/api/v1/groups/${element.id}`,
    data: data,
    needAuth: true,
  });

  if (response) {
    // This will update the userTasks and so it will update the group tasks
    // thanks to the useEffect in the groupContext
    userDispatch({
      type: "UPDATE_USER_GROUP",
      payload: response.data.group,
    });

    // Add notification
    setPopup({ message: response.data.message, type: "success" });

    // Closing the modal
    handleClose();
  }
}
