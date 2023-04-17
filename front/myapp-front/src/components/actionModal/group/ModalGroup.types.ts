import { Group } from "../../../shared/group/interfaces";
import { BaseActionModalProps } from "../ActionModal.types";

export type GroupModalProps = {
  initialData: Group;
} & Omit<BaseActionModalProps, "btnName">;
