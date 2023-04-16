import { TagFormDetails } from "../../../types/interfaces";
import { BaseActionModalProps } from "../ActionModal.types";

export type ModalTagProps = {
  initialData: TagFormDetails;
  handleSubmit: (data: TagFormDetails) => void;
} & Omit<BaseActionModalProps, "btnName">;
