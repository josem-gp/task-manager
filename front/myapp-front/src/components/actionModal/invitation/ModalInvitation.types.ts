import { Invitation } from "../../../shared/invitation/interfaces";
import { BaseActionModalProps } from "../ActionModal.types";

export type InvitationModalProps = {
  initialData: Invitation;
} & Omit<BaseActionModalProps, "btnName">;
