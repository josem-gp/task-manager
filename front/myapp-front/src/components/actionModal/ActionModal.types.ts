import {
  GroupDetails,
  InvitationDetails,
  TaskFormDetails,
} from "../../types/interfaces";
import { TagDetails, TaskDetails, UserDetails } from "../../types/interfaces";

export type ActionModalProps = BaseModal & ModalActions & DataProps;

type BaseModal = {
  btnName: string;
};

type DataProps =
  | TaskDataProps
  | GroupDataProps
  | TagDataProps
  | InvitationDataProps;

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
  initialData: TagDetails;
};

type InvitationDataProps = {
  type: "invitation";
  initialData: InvitationDetails;
};

type ModalActions = {
  action: "show" | "create" | "edit";
};

export type TaskModalProps = {
  initialData: TaskFormDetails;
} & ModalActions;

export type TagModalProps = {
  initialData: TagDetails;
} & ModalActions;

export type GroupModalProps = {
  initialData: GroupDetails;
} & ModalActions;

export type InvitationModalProps = {
  initialData: InvitationDetails;
} & ModalActions;

export type ActionModalHeaderProps = {
  title: string;
  isShow: boolean;
  setFormAction: React.Dispatch<
    React.SetStateAction<"show" | "create" | "edit">
  >;
};
