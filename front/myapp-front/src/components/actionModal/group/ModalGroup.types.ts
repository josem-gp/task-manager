import { GroupRequest } from "../../../shared/group/interfaces";
import { BaseActionModalProps } from "../ActionModal.types";

export type ModalGroupProps = {
  initialData: GroupRequest;
  handleSubmit: (data: GroupRequest) => void;
} & Omit<BaseActionModalProps, "btnName" | "setGroup">;
