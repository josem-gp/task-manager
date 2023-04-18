import { TagRequest, TagResponse } from "../../shared/tag/interfaces";
import { HandleTagSubmitProps } from "./api.types";

export async function handleTagSubmit(
  props: HandleTagSubmitProps,
  data: TagRequest
) {
  const { groupState, groupDispatch, setPopup, handleAxiosCall, handleClose } =
    props;
  const response = await handleAxiosCall<TagRequest, TagResponse>({
    method: "post",
    url: `http://localhost:3000/api/v1/groups/${groupState.group.id}/tags`,
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
