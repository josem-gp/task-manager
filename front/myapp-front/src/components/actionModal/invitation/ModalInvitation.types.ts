import { InvitationDetails } from "../../../types/interfaces";
import { BaseActionModalProps } from "../ActionModal.types";

export type InvitationModalProps = {
  initialData: InvitationDetails;
} & Omit<BaseActionModalProps, "btnName">;
