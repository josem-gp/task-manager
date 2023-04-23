import { InvitationRequest } from "../../../shared/invitation/interfaces";
import { BaseActionModalProps } from "../ActionModal.types";

export type InvitationModalProps = {
  initialData: InvitationRequest;
  handleSubmit: (data: InvitationRequest) => Promise<void>;
} & Omit<BaseActionModalProps, "btnName" | "action">;
