import { GroupDetails } from "../../../types/interfaces";
import { BaseActionModalProps } from "../ActionModal.types";

export type GroupModalProps = {
  initialData: GroupDetails;
} & Omit<BaseActionModalProps, "btnName">;
