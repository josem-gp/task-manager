import {
  InvitationRequest,
  InvitationResponse,
} from "../../shared/invitation/interfaces";
import { HandleInvitationCreateProps } from "./api.types";

export async function handleInvitationCreate(
  props: HandleInvitationCreateProps,
  data: InvitationRequest
) {
  const { groupState, groupDispatch, setPopup, handleAxiosCall, handleClose } =
    props;
  const response = await handleAxiosCall<InvitationRequest, InvitationResponse>(
    {
      method: "post",
      url: `http://localhost:3000/api/v1/groups/${groupState.group.id}/send_invitation`,
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
