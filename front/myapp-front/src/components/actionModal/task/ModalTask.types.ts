import { TaskRequest } from "../../../shared/task/interfaces";
import { BaseActionModalProps } from "../ActionModal.types";

export type ModalTaskProps = {
  initialData: TaskRequest;
  handleSubmit: (data: TaskRequest) => void;
} & Omit<BaseActionModalProps, "btnName">;
