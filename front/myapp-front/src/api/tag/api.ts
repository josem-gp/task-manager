import { GenericMessageResponse } from "../../shared/general/interfaces";
import { TagRequest, TagResponse } from "../../shared/tag/interfaces";
import {
  HandleTagCreateProps,
  HandleTagDeleteProps,
  HandleTagUpdateProps,
} from "./api.types";

export async function handleTagCreate(
  props: HandleTagCreateProps,
  data: TagRequest
) {
  const { groupState, groupDispatch, setPopup, handleAxiosCall, handleClose } =
    props;
  const response = await handleAxiosCall<TagRequest, TagResponse>({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/api/v1/groups/${groupState.group.id}/tags`,
    data: data,
    needAuth: true,
  });

  if (response) {
    // Add task to userTasks after task creation
    groupDispatch({
      type: "ADD_GROUP_TAG",
      payload: response.data.tag,
    });
    // Add notification
    setPopup({ message: response.data.message, type: "success" });
  }

  // Closing the modal
  handleClose();
}

// Update a specific tag in the groupTags state
export async function handleTagUpdate(
  props: HandleTagUpdateProps,
  data: TagRequest
) {
  const {
    groupState,
    groupDispatch,
    setPopup,
    handleAxiosCall,
    element,
    handleClose,
  } = props;

  const response = await handleAxiosCall<TagRequest, TagResponse>({
    method: "patch",
    url: `${process.env.REACT_APP_API_URL}/api/v1/groups/${groupState.group.id}/tags/${element.id}`,
    data: data,
    needAuth: true,
  });

  if (response) {
    groupDispatch({
      type: "UPDATE_GROUP_TAG",
      payload: response.data.tag,
    });

    // Add notification
    setPopup({ message: response.data.message, type: "success" });

    // Closing the modal
    handleClose();
  }
}

// Remove a tag
export async function handleTagDelete(props: HandleTagDeleteProps) {
  const { groupState, groupDispatch, setPopup, handleAxiosCall, elementId } =
    props;

  const response = await handleAxiosCall<undefined, GenericMessageResponse>({
    method: "delete",
    url: `${process.env.REACT_APP_API_URL}/api/v1/groups/${groupState.group.id}/tags/${elementId}`,
    needAuth: true,
  });

  if (response) {
    // Remove task from UserTask
    groupDispatch({
      type: "REMOVE_GROUP_TAG",
      payload: elementId,
    });
    // Add notification
    setPopup({ message: response.data.message, type: "success" });
  }
}
