import { GroupRequest } from "../../shared/group/interfaces";
import { InvitationRequest } from "../../shared/invitation/interfaces";
import { TagRequest } from "../../shared/tag/interfaces";
import { TaskRequest } from "../../shared/task/interfaces";

export type ActionModalProps =
  | (BaseActionModalProps & TaskDataProps)
  | (BaseActionModalProps & GroupDataProps)
  | (BaseActionModalProps & TagDataProps)
  | (BaseActionModalProps & InvitationDataProps);

export type BaseActionModalProps = {
  btnName: string;
  action: "show" | "create" | "edit";
  setGroup?: boolean;
  elementId?: number;
};

type TaskDataProps = {
  type: "task";
  initialData: TaskRequest;
};

type GroupDataProps = {
  type: "group";
  initialData: GroupRequest;
};

type TagDataProps = {
  type: "tag";
  initialData: TagRequest;
};

type InvitationDataProps = {
  type: "invitation";
  initialData: InvitationRequest;
};
