import { TagRequest } from "../../../shared/tag/interfaces";
import { BaseActionModalProps } from "../ActionModal.types";

export type ModalTagProps = {
  initialData: TagRequest;
  handleSubmit: (data: TagRequest) => void;
} & Omit<BaseActionModalProps, "btnName" | "setGroup">;
