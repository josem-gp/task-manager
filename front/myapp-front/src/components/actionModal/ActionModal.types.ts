import {
  InvitationDetails,
  TagFormDetails,
  TaskFormDetails,
} from "../../types/interfaces";
import { UserDetails } from "../../types/interfaces";

export type ActionModalProps =
  | (BaseActionModalProps & TaskDataProps)
  | (BaseActionModalProps & GroupDataProps)
  | (BaseActionModalProps & TagDataProps)
  | (BaseActionModalProps & InvitationDataProps);

export type BaseActionModalProps = {
  btnName: string;
  action: "show" | "create" | "edit";
  setGroup?: boolean;
};

type TaskDataProps = {
  type: "task";
  initialData: TaskFormDetails;
};

type GroupDataProps = {
  type: "group";
  initialData: UserDetails;
};

type TagDataProps = {
  type: "tag";
  initialData: TagFormDetails;
};

type InvitationDataProps = {
  type: "invitation";
  initialData: InvitationDetails;
};
