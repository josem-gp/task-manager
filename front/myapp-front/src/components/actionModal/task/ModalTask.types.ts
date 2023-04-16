import { TaskFormDetails } from "../../../types/interfaces";
import { BaseActionModalProps } from "../ActionModal.types";

export type ModalTaskProps = {
  initialData: TaskFormDetails;
  handleSubmit: (data: TaskFormDetails) => void;
} & Omit<BaseActionModalProps, "btnName">;
