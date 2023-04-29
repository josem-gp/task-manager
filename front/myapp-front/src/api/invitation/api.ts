import { GenericMessageResponse } from "../../shared/general/interfaces";
import {
  InvitationRequest,
  InvitationResponse,
} from "../../shared/invitation/interfaces";
import {
  HandleInvitationCreateProps,
  HandleInvitationDeleteProps,
} from "./api.types";

export async function handleInvitationCreate(
  props: HandleInvitationCreateProps,
  data: InvitationRequest
) {
  const { groupState, groupDispatch, setPopup, handleAxiosCall, handleClose } =
    props;
  const response = await handleAxiosCall<InvitationRequest, InvitationResponse>(
    {
      method: "post",
      url: `${process.env.REACT_APP_FRONTEND_URL}/api/v1/groups/${groupState.group.id}/send_invitation`,
      data: data,
      needAuth: true,
    }
  );

  if (response) {
    // Add task to userTasks after task creation
    groupDispatch({
      type: "ADD_GROUP_INVITATION",
      payload: response.data.invitation,
    });
    // Add notification
    setPopup({ message: response.data.message, type: "success" });
  }

  // Closing the modal
  handleClose();
}

// Disable invitation
export async function handleInvitationDelete(
  props: HandleInvitationDeleteProps
) {
  const { groupDispatch, setPopup, handleAxiosCall, elementId } = props;

  const response = await handleAxiosCall<undefined, GenericMessageResponse>({
    method: "delete",
    url: `${process.env.REACT_APP_FRONTEND_URL}/api/v1/disable_invitation/${elementId}`,
    needAuth: true,
  });

  if (response) {
    // Remove task from UserTasks
    groupDispatch({
      type: "REMOVE_GROUP_INVITATION",
      payload: elementId,
    });

    // Add notification
    setPopup({ message: response.data.message, type: "success" });
  }
}
